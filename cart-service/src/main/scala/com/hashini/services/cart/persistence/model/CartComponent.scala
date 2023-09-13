package com.hashini.services.cart.persistence.model

import com.hashini.services.cart.persistence.model.savable.Cart
import slick.lifted.ProvenShape

import java.sql.Timestamp

trait CartComponent {
  this: ProfileComponent =>

  import profile.api._

  class CartTable(tag: Tag) extends Table[Cart](tag, _tableName = "carts") {
    def id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)

    def userId: Rep[Int] = column[Int]("user_id")

    def createdTime: Rep[Timestamp] = column[Timestamp]("created_time")

    override def * : ProvenShape[Cart] = (userId, createdTime, id) <> (Cart.tupled, Cart.unapply)
  }

  lazy val cartQuery = TableQuery[CartTable]

}