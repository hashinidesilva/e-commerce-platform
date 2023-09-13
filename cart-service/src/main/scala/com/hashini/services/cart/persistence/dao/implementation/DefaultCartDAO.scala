package com.hashini.services.cart.persistence.dao.implementation

import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.CartDAO
import com.hashini.services.cart.persistence.model.DAL._
import com.hashini.services.cart.persistence.model.savable.Cart

import scala.concurrent.Future

class DefaultCartDAO extends CartDAO {

  import profile.api._

  override def getCart(userId: Int): Future[Option[Cart]] = {
    db.run(cartQuery.filter(_.userId === userId).result.headOption)
  }
}
