package com.hashini.services.cart.persistence.dao.implementation

import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.CartDAO
import com.hashini.services.cart.persistence.model.DAL.{cartQuery, profile}
import com.hashini.services.cart.persistence.model.savable.Cart

import scala.concurrent.Future

class DefaultCartDAO extends CartDAO {

  import profile.api._

  override def getCart(userId: Int): Future[Option[Cart]] = {
    db.run(cartQuery.filter(_.userId === userId).result.headOption)
  }

  override def save(cart: Cart): DBIOAction[Cart, NoStream, Effect.Write] = {
    (cartQuery returning cartQuery) += cart
  }

  /*  override def addCart(cartDTO: CartDTO): Future[CartResponseDTO] = {
      val query = for {
        cart <- (cartQuery returning cartQuery) += cartDTO.getCart
        items = cartDTO.items
        cartItems <- DBIO.sequence(items.map(item => cartItemDAO.insertCartItemIO(item.getCartItem(cart.id))))
      } yield CartResponseDTO(cart.id, cart.userId, TimestampConverter.convertToString(cart.createdTime), cartItems)

      db.run(query.transactionally)
    }*/
}