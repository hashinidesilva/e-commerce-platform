package com.hashini.services.product.persistence.model

import com.hashini.services.product.persistence.model.savable.Category
import slick.lifted.ProvenShape

trait CategoryComponent {
  this: ProfileComponent =>

  import profile.api._

  class CategoryTable(tag: Tag) extends Table[Category](tag, _tableName = "category") {
    def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def name: Rep[String] = column[String]("name")

    override def * : ProvenShape[Category] = (name, id) <> (Category.tupled, Category.unapply)
  }

  lazy val categoryQuery = TableQuery[CategoryTable]

}