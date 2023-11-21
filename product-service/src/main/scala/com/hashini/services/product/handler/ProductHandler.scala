package com.hashini.services.product.handler

import com.hashini.services.product.dto.{ProductDTO, ProductRatingDTO, ProductResponseDTO, ProductsDTO}
import com.hashini.services.product.persistence.dao.ProductDAO
import com.hashini.services.product.rabbitmq.dto.ProductQuantityDTO

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

  def updateRating(productRatingDTO: ProductRatingDTO): Future[Int] = {
    productDAO.updateAverageRating(productRatingDTO.productId, f"${productRatingDTO.averageRating}%.2f".toDouble)
  }

  def updateQuantity(updatedQuantities: Seq[ProductQuantityDTO]): Future[Seq[Unit]] = {
    Future.sequence(updatedQuantities.map(updatedProduct =>
      productDAO.updateQuantity(updatedProduct.productId, updatedProduct.quantity)))
  }

}