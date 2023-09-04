package com.hashini.services.product.persistence.dao.implementation

import com.hashini.services.product.persistence.DatabaseConnector.db
import com.hashini.services.product.persistence.dao.ProductDAO
import com.hashini.services.product.persistence.model.DAL._
import com.hashini.services.product.persistence.model.savable.ProductItem

import scala.concurrent.Future

class DefaultProductDAO extends ProductDAO {

  import profile.api._

  override def addProduct(product: ProductItem): Future[ProductItem] = {
    db.run((productQuery returning productQuery) += product)
  }

  override def search(name: Option[String],
                      category: Option[String]): Future[Seq[ProductItem]] = {
    val searchName = name.getOrElse("").trim.toLowerCase
    db.run((productQuery.filterIf(name.nonEmpty)(_.name.toLowerCase like s"%$searchName%") join
      categoryQuery on (_.categoryId === _.id)).
      filterOpt(category)(_._2.name.toLowerCase === _.toLowerCase).
      map(_._1).result)
  }
}