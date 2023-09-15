package com.hashini.services.cart.persistence.dao

import com.hashini.services.cart.persistence.model.DAL.profile
import com.hashini.services.cart.persistence.model.savable.CartItem

import scala.concurrent.Future

trait CartItemDAO {

  import profile.api._

  def insertOrUpdate(item: CartItem): Future[Int]

  def getCartItems(cartId: Int): Future[Seq[CartItem]]

  def saveCartItems(cartItems: Seq[CartItem]): DBIOAction[Seq[CartItem], NoStream, Effect.Write]

  def delete(id: Int): Future[Int]

}