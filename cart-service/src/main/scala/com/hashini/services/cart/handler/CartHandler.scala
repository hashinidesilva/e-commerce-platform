package com.hashini.services.cart.handler

import com.hashini.services.cart.dto.{CartDTO, CartItemDTO, CartItemResponse, CartResponseDTO}
import com.hashini.services.cart.persistence.dao.{CartDAO, CartItemDAO}
import com.hashini.services.cart.persistence.model.savable.{Cart, CartItem}

import scala.concurrent.{ExecutionContext, Future}

class CartHandler(cartDAO: CartDAO,
                  cartItemDAO: CartItemDAO,
                  productsHandler: FetchProductsHandler)(implicit execution_Context: ExecutionContext) {

  def getCart(userId: Int): Future[Option[CartResponseDTO]] = {
    for {
      cartOption <- cartDAO.getCartByUserId(userId)
      cartItems <- getCartItems(cartOption)
      productsResponse <- productsHandler.sendProductsRequest()
      mappedItems = cartItems.map(item => item -> productsResponse.items.find(_.id == item.productId)).toMap
      removableItems = mappedItems.filter(_._2.isEmpty).keys.map(_.id).toSeq
      _ <- Future.sequence(removableItems.map(deleteItem))
    } yield {
      val productDefinedList = mappedItems.filter(_._2.isDefined).toSeq
      val cartItemsResponse = productDefinedList.map(item => item._1.getCartItemResponse(item._2))
      cartOption.map(_.getCartResponseDTO(cartItemsResponse))
    }
  }

  def addCart(cartDTO: CartDTO): Future[CartResponseDTO] = {
    cartDAO.insertOrUpdate(cartDTO.getCart).map(_.getCartResponseDTO())
  }

  def addOrUpdateCartItem(cartItemDTO: CartItemDTO,
                          cartId: Int): Future[CartItemResponse] = {
    for {
      product <- productsHandler.sendProductRequest(cartItemDTO.productId)
      cartOption <- cartDAO.getCart(cartId)
      cartItem <- save(cartOption, cartItemDTO.getCartItem)
    } yield cartItem.getCartItemResponse(Option(product))
  }

  def deleteItem(id: Int): Future[Int] = {
    cartItemDAO.delete(id)
  }

  def updateItem(id: Int,
                 item: CartItemDTO): Future[CartItem] = {
    cartItemDAO.insertOrUpdate(item.getCartItem.copy(id = id))
  }

  def updateSelected(cartId: Int,
                     selected: Boolean): Future[Int] = {
    cartItemDAO.updateSelected(cartId, selected)
  }

  private def save(cartOption: Option[Cart],
                   cartItem: CartItem): Future[CartItem] = {
    cartOption match {
      case Some(cart) =>
        cartItemDAO.insertOrUpdate(cartItem.copy(cartId = cart.id))
      case None =>
        Future.failed(new Exception("Cart not found"))
    }
  }

  private def getCartItems(cartOption: Option[Cart]): Future[Seq[CartItem]] = {
    cartOption match {
      case Some(cart) =>
        cartItemDAO.getCartItems(cart.id)
      case None =>
        Future.successful(Seq[CartItem]())
    }
  }

}