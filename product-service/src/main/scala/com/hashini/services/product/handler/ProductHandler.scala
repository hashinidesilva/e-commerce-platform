package com.hashini.services.product.handler

import com.hashini.services.product.dto.{ProductDTO, ProductResponseDTO, ProductsDTO}
import com.hashini.services.product.persistence.dao.ProductDAO

import scala.concurrent.{ExecutionContext, Future}

class ProductHandler(productDAO: ProductDAO)(implicit executionContext: ExecutionContext) {

  def getProducts: Future[ProductsDTO] = {
    for {
      productItems <- productDAO.search()
    } yield ProductsDTO(productItems.map(_.getProductResponseDTO))
  }

  def getProduct(id: Int): Future[ProductDTO] = {
    Future(ProductDTO("", 1, 1, "", 1))
  }

  def addProduct(product: ProductDTO): Future[ProductResponseDTO] = {
    val productItem = productDAO.addProduct(product.getProductItem)
    productItem.map(_.getProductResponseDTO)
  }

}