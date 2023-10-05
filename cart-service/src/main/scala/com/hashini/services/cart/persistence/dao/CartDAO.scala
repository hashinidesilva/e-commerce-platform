package com.hashini.services.cart.persistence.dao

import com.hashini.services.cart.persistence.model.savable.Cart

import scala.concurrent.Future

trait CartDAO {

  def getCartByUserId(userId: Int): Future[Option[Cart]]

  def getCart(id: Int): Future[Option[Cart]]

  def insertOrUpdate(cart: Cart): Future[Cart]
}