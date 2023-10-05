package com.hashini.services.cart.persistence.dao.implementation

import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.CartDAO
import com.hashini.services.cart.persistence.model.DAL.{cartQuery, profile}
import com.hashini.services.cart.persistence.model.savable.Cart

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class DefaultCartDAO extends CartDAO {

  import profile.api._

  override def getCartByUserId(userId: Int): Future[Option[Cart]] = {
    db.run(cartQuery.filter(_.userId === userId).result.headOption)
  }

  override def getCart(id: Int): Future[Option[Cart]] = {
    db.run(cartQuery.filter(_.id === id).result.headOption)
  }

  override def insertOrUpdate(cart: Cart): Future[Cart] = {
    val query = for {
      cartOption <- (cartQuery returning cartQuery).insertOrUpdate(cart)
    } yield cartOption.getOrElse(cart)
    db.run(query)
  }
}