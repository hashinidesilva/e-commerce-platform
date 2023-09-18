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

  def updateSelected(cartId: Int,
                     selected: Boolean): Future[Int] = {
    cartItemDAO.updateSelected(cartId, selected)
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
                            cartItems: Seq[CartItemDTO]):
  DBIOAction[(Cart, Seq[CartItem]), NoStream, Effect.Read with Effect.Write] = {
    val cartId = cart.id
    for {
      items <- DBIO.sequence(cartItems.map(item => saveCartItem(cartId, item.getCartItem)))
    } yield (cart, items)
  }

  private def saveCartAndCartItems(cartDTO: CartDTO): DBIOAction[(Cart, Seq[CartItem]), NoStream, Effect.Write with Effect.Read] = {
    for {
      cart <- cartDAO.insertOrUpdateIO(cartDTO.getCart)
      items <- saveCartItems(cart, cartDTO.items)
    } yield items
  }

  private def saveCartItem(cartId: Int,
                           cartItem: CartItem): DBIOAction[CartItem, NoStream, Effect.Read with Effect.Write] = {
    for {
      itemOption <- cartItemDAO.loadByProductId(cartId, cartItem.productId)
      cartItem <- itemOption match {
        case Some(item) =>
          cartItemDAO.insertOrUpdateIO(cartItem.copy(cartId = cartId, id = item.id,
            quantity = item.quantity + cartItem.quantity))
        case None =>
          cartItemDAO.insertOrUpdateIO(cartItem.copy(cartId = cartId))
      }
    } yield cartItem
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