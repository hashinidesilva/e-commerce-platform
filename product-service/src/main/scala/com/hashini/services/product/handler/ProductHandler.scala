package com.hashini.services.product.handler

import com.hashini.services.product.model.Product

import scala.concurrent.{ExecutionContext, Future}

class ProductHandler()(implicit executionContext: ExecutionContext) {

  def getProducts: Future[Seq[Product]] = {
    Future(Seq(Product(1, "", "", 1, "")))
  }

  def getProduct(id: Int): Future[Product] = {
    Future(Product(id, "", "", 1, ""))
  }

  def addProduct(product: Product): Future[Product] = {
    Future(product)
  }

}