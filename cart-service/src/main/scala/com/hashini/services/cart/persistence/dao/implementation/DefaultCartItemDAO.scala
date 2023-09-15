package com.hashini.services.cart.persistence.dao.implementation

import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.CartItemDAO
import com.hashini.services.cart.persistence.model.DAL.{cartItemQuery, profile}
import com.hashini.services.cart.persistence.model.savable.CartItem

import scala.concurrent.Future

class DefaultCartItemDAO extends CartItemDAO {

  import profile.api._

  override def insertOrUpdate(item: CartItem): Future[Int] = {
    db.run(cartItemQuery.insertOrUpdate(item))
  }

  override def getCartItems(cartId: Int): Future[Seq[CartItem]] = {
    db.run(cartItemQuery.filter(_.cartId === cartId).result)
  }

  override def saveCartItems(cartItems: Seq[CartItem]): DBIOAction[Seq[CartItem], NoStream, Effect.Write] = {
    DBIO.sequence(cartItems.map(item => insertCartItemIO(item)))
  }

  override def delete(id: Int): Future[Int] = {
    db.run(cartItemQuery.filter(_.id === id).delete)
  }

  private def insertCartItemIO(cartItem: CartItem): DBIOAction[CartItem, NoStream, Effect.Write] = {
    (cartItemQuery returning cartItemQuery) += cartItem
  }
}