package com.hashini.services.product.persistence.dao

import com.hashini.services.product.persistence.model.savable.ProductItem

import scala.concurrent.Future

trait ProductDAO {

  def addProduct(product: ProductItem): Future[ProductItem]

  def search(name: Option[String],
             category: Option[String]): Future[Seq[ProductItem]]

}