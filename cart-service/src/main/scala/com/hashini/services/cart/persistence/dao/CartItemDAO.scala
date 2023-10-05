package com.hashini.services.cart.persistence.dao

import com.hashini.services.cart.persistence.model.DAL.profile
import com.hashini.services.cart.persistence.model.savable.CartItem

import scala.concurrent.Future

trait CartItemDAO {

  import profile.api._

  def insertOrUpdate(item: CartItem): Future[CartItem]

  def getCartItems(cartId: Int): Future[Seq[CartItem]]

  def loadByProductId(cartId: Int,
                      productId: Int): DBIOAction[Option[CartItem], NoStream, Effect.Read]

  def delete(id: Int): Future[Int]

  def updateSelected(cartId: Int,
                     selected: Boolean): Future[Int]

}