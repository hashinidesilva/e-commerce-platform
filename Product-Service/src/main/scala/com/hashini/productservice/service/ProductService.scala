package com.hashini.productservice.service

import com.hashini.productservice.model.Product
import scala.concurrent.{ExecutionContext, Future}

class ProductService()(implicit executionContext: ExecutionContext) {

  def getProducts: Future[Seq[Product]] = {
    Future(Seq(Product(1, "", "", 1, "")))
  }

  def getProduct(id: Int): Future[Product] = {
    Future(Product(1, "", "", 1, ""))
  }

  def addProduct(product: Product): Future[Product] = {
    Future(Product(1, "", "", 1, ""))
  }

}