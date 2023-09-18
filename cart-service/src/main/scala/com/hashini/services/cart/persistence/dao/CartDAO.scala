package com.hashini.services.cart.persistence.dao

import com.hashini.services.cart.persistence.model.DAL.profile
import com.hashini.services.cart.persistence.model.savable.Cart

import scala.concurrent.Future

trait CartDAO {

  import profile.api._

  def getCart(userId: Int): Future[Option[Cart]]

  def insertOrUpdateIO(cart: Cart): DBIOAction[Cart, NoStream, Effect.Write]
}