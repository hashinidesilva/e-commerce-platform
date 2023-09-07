package com.hashini.services.order.persistence.model

import com.hashini.services.order.persistence.model.savable.OrderItem
import slick.lifted.ProvenShape

trait OrderItemComponent {

  this: ProfileComponent =>

  import profile.api._

  class OrderItemTable(tag: Tag) extends Table[OrderItem](tag, _tableName = "order_items") {

    def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def productId: Rep[Int] = column[Int]("product_id")

    def orderId: Rep[Int] = column[Int]("order_id")

    def quantity: Rep[Int] = column[Int]("quantity")

    def unitPrice: Rep[Double] = column[Double]("unit_price")

    def subtotal: Rep[Double] = column[Double]("subtotal")

    override def * : ProvenShape[OrderItem] = (productId,
      orderId, quantity, unitPrice, subtotal, id) <> (OrderItem.tupled, OrderItem.unapply)
  }

  lazy val orderItemQuery = TableQuery[OrderItemTable]

}