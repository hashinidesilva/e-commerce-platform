package com.hashini.services.cart.persistence.model

import com.hashini.services.cart.persistence.model.savable.CartItem
import slick.lifted.ProvenShape

trait CartItemComponent {
  this: ProfileComponent =>

  import profile.api._

  class CartItemTable(tag: Tag) extends Table[CartItem](tag, _tableName = "cart_items") {

    def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def productId: Rep[Int] = column[Int]("product_id")

    def cartId: Rep[Int] = column[Int]("cart_id")

    def quantity: Rep[Int] = column[Int]("quantity")

    def selected: Rep[Boolean] = column[Boolean]("selected")

    override def * : ProvenShape[CartItem] = (productId,
      cartId,
      quantity,
      selected,
      id) <> (CartItem.tupled, CartItem.unapply)
  }

  lazy val cartItemQuery = TableQuery[CartItemTable]

}