package com.hashini.services.product.persistence.model

import com.hashini.services.product.persistence.model.savable.{Category, ProductItem}
import slick.lifted.{ForeignKeyQuery, ProvenShape}

import java.sql.Timestamp

trait ProductComponent {
  this: ProfileComponent with CategoryComponent =>

  import profile.api._

  class ProductTable(tag: Tag) extends Table[ProductItem](tag, _tableName = "product") {

    def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def categoryId: Rep[Int] = column[Int]("category_id")

    def name: Rep[String] = column[String]("name")

    def unitPrice: Rep[Double] = column[Double]("unit_price")

    def description: Rep[String] = column[String]("description")

    def quantity: Rep[Int] = column[Int]("quantity")

    def createdTime: Rep[Timestamp] = column[Timestamp]("created_time")

    def updatedTime: Rep[Timestamp] = column[Timestamp]("updated_time")

    def averageRating: Rep[Double] = column[Double]("average_rating")

    def category: ForeignKeyQuery[CategoryTable, Category] = foreignKey("fk_category", categoryId,
      categoryQuery)(_.id)

    override def * : ProvenShape[ProductItem] = (name,
      unitPrice,
      description,
      quantity,
      createdTime,
      updatedTime,
      averageRating,
      id,
      categoryId) <> (ProductItem.tupled, ProductItem.unapply)
  }

  lazy val productQuery = TableQuery[ProductTable]

}