package com.hashini.services.cart.handler

import com.hashini.services.cart.api.conveter.TimestampConverter
import com.hashini.services.cart.dto.{CartDTO, CartItemDTO, CartResponseDTO}
import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.{CartDAO, CartItemDAO}
import com.hashini.services.cart.persistence.model.DAL.profile
import com.hashini.services.cart.persistence.model.savable.{Cart, CartItem}

import scala.concurrent.{ExecutionContext, Future}

class CartHandler(cartDAO: CartDAO,
                  cartItemDAO: CartItemDAO,
                  productsHandler: FetchProductsHandler)(implicit execution_Context: ExecutionContext) {

  import profile.api._

  def getCart(userId: Int): Future[Option[CartResponseDTO]] = {
    for {
      cartOption <- cartDAO.getCart(userId)
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
    val cartItems = cartDTO.items
    for {
      products <- Future.sequence(cartItems.map(item => productsHandler.sendProductRequest(item.productId)))
      cartOption <- cartDAO.getCart(1)
      cartResponse <- save(cartOption, cartDTO)
    } yield {
      val cart = cartResponse._1
      val items = cartResponse._2
      CartResponseDTO(cart.id, cart.userId, TimestampConverter.convertToString(cart.createdTime),
        items.map(item => item.getCartItemResponse(products.find(_.id == item.productId))))
    }
  }

  def deleteItem(id: Int): Future[Int] = {
    cartItemDAO.delete(id)
  }

  def updateItem(id: Int,
                 item: CartItemDTO): Future[Int] = {
    cartItemDAO.insertOrUpdate(item.getCartItem.copy(id = id))
  }

  private def save(cartOption: Option[Cart],
                   cartDTO: CartDTO): Future[(Cart, Seq[CartItem])] = {
    val query = cartOption match {
      case Some(cart) =>
        saveCartItems(cart, cartDTO.items)
      case None =>
        saveCartAndCartItems(cartDTO)
    }

    db.run(query.transactionally)
  }

  private def saveCartItems(cart: Cart,
                            cartItems: Seq[CartItemDTO]): DBIOAction[(Cart, Seq[CartItem]), NoStream, Effect.Write] = {
    val cartId = cart.id
    for {
      items <- cartItemDAO.saveCartItems(cartItems.map(_.getCartItem.copy(cartId = cartId)))
    } yield (cart, items)
  }

  private def saveCartAndCartItems(cartDTO: CartDTO): DBIOAction[(Cart, Seq[CartItem]), NoStream, Effect.Write] = {
    for {
      cart <- cartDAO.save(cartDTO.getCart)
      items <- cartItemDAO.saveCartItems(cartDTO.items.map(_.getCartItem.copy(cartId = cart.id)))
    } yield (cart, items)
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