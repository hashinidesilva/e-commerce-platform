package com.hashini.services.product.handler

import com.hashini.services.product.dto.{ProductDTO, ProductResponseDTO, ProductsDTO}
import com.hashini.services.product.persistence.dao.ProductDAO

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class ProductHandler(productDAO: ProductDAO)(implicit executionContext: ExecutionContext) {

  def getProducts(name: Option[String],
                  category: Option[String]): Future[ProductsDTO] = {
    for {
      productItems <- productDAO.search(name, category)
    } yield ProductsDTO(productItems.map(_.getProductResponseDTO))
  }

  def getProduct(id: Int): Future[Try[ProductResponseDTO]] = {
    for {
      productTry <- productDAO.load(id)
    } yield productTry.map(_.getProductResponseDTO)
  }

  def addProduct(product: ProductDTO): Future[ProductResponseDTO] = {
    val productItem = productDAO.addProduct(product.getProductItem)
    productItem.map(_.getProductResponseDTO)
  }

}