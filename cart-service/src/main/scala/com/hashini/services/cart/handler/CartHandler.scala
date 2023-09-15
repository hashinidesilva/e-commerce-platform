package com.hashini.services.cart.handler

import com.hashini.services.cart.api.conveter.TimestampConverter
import com.hashini.services.cart.dto.{CartDTO, CartItemDTO, CartResponseDTO}
import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.{CartDAO, CartItemDAO}
import com.hashini.services.cart.persistence.model.DAL.profile
import com.hashini.services.cart.persistence.model.savable.{Cart, CartItem}

import scala.concurrent.{ExecutionContext, Future}

class CartHandler(cartDAO: CartDAO,
                  cartItemDAO: CartItemDAO)(implicit execution_Context: ExecutionContext) {

  import profile.api._

  def getCart(userId: Int): Future[Option[CartResponseDTO]] = {
    for {
      cartOption <- cartDAO.getCart(userId)
      cartItems <- getCartItems(cartOption)
    } yield cartOption.map(_.getCartResponseDTO(cartItems))
  }

  def addCart(cartDTO: CartDTO): Future[CartResponseDTO] = {
    for {
      cartOption <- cartDAO.getCart(1)
      cartResponse <- save(cartOption, cartDTO)
    } yield cartResponse
  }

  def deleteItem(id: Int): Future[Int] = {
    cartItemDAO.delete(id)
  }

  def updateItem(id: Int,
                 item: CartItemDTO): Future[Int] = {
    cartItemDAO.insertOrUpdate(item.getCartItem.copy(id = id))
  }

  private def save(cartOption: Option[Cart],
                   cartDTO: CartDTO): Future[CartResponseDTO] = {
    val query = cartOption match {
      case Some(cart) =>
        saveCartItems(cart, cartDTO.items)
      case None =>
        saveCartAndCartItems(cartDTO)
    }

    db.run(query.transactionally)
  }

  private def saveCartItems(cart: Cart,
                            cartItems: Seq[CartItemDTO]): DBIOAction[CartResponseDTO, NoStream, Effect.Write] = {
    val cartId = cart.id
    for {
      items <- cartItemDAO.saveCartItems(cartItems.map(_.getCartItem.copy(cartId = cartId)))
    } yield CartResponseDTO(cartId, cart.userId, TimestampConverter.convertToString(cart.createdTime), items)
  }

  private def saveCartAndCartItems(cartDTO: CartDTO): DBIOAction[CartResponseDTO, NoStream, Effect.Write] = {
    for {
      cart <- cartDAO.save(cartDTO.getCart)
      items <- cartItemDAO.saveCartItems(cartDTO.items.map(_.getCartItem.copy(cartId = cart.id)))
    } yield CartResponseDTO(cart.id, cart.userId, TimestampConverter.convertToString(cart.createdTime), items)
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