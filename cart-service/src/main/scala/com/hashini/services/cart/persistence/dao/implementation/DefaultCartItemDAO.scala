package com.hashini.services.cart.persistence.dao.implementation

import com.hashini.services.cart.persistence.DatabaseConnector.db
import com.hashini.services.cart.persistence.dao.CartItemDAO
import com.hashini.services.cart.persistence.model.DAL.{cartItemQuery, profile}
import com.hashini.services.cart.persistence.model.savable.CartItem

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class DefaultCartItemDAO extends CartItemDAO {

  import profile.api._

  override def insertOrUpdate(item: CartItem): Future[CartItem] = {
    val query = for {
      itemOption <- (cartItemQuery returning cartItemQuery).insertOrUpdate(item)
    } yield itemOption.getOrElse(item)

    db.run(query)
  }

  override def getCartItems(cartId: Int): Future[Seq[CartItem]] = {
    db.run(cartItemQuery.filter(_.cartId === cartId).result)
  }

  override def delete(id: Int): Future[Int] = {
    db.run(cartItemQuery.filter(_.id === id).delete)
  }

  override def deleteByCartId(cartId: Int): Future[Int] = {
    db.run(cartItemQuery.filter(_.cartId === cartId).delete)
  }

  override def loadByProductId(cartId: Int,
                               productId: Int): DBIOAction[Option[CartItem], NoStream, Effect.Read] = {
    cartItemQuery.filter(item => item.cartId === cartId && item.productId === productId).result.headOption
  }

  override def updateSelected(cartId: Int, selected: Boolean): Future[Int] = {
    db.run(cartItemQuery.filter(_.cartId === cartId).map(_.selected).update(selected))
  }
}