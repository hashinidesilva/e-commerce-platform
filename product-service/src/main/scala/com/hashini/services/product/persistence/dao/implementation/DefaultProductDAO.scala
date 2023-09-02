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

  override def search(): Future[Seq[ProductItem]] = {
    db.run(productQuery.result)
  }
}