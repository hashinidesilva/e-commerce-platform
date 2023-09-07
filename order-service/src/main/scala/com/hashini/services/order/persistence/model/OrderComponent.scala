package com.hashini.services.order.persistence.model

import com.hashini.services.order.persistence.model.savable.Order
import slick.lifted.ProvenShape

import java.sql.Timestamp

trait OrderComponent {
  this: ProfileComponent =>

  import profile.api._

  class OrderTable(tag: Tag) extends Table[Order](tag, _tableName = "orders") {

    def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def userId: Rep[Int] = column[Int]("user_id")

    def orderDate: Rep[Timestamp] = column[Timestamp]("order_date")

    def status: Rep[String] = column[String]("status")

    def totalAmount: Rep[Double] = column[Double]("total_amount")

    override def * : ProvenShape[Order] = (userId,
      totalAmount, status, orderDate, id) <> (Order.tupled, Order.unapply)
  }

  lazy val orderQuery = TableQuery[OrderTable]
}