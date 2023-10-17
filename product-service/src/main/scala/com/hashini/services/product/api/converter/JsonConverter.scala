package com.hashini.services.product.api.converter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.product.dto._
import com.hashini.services.product.persistence.model.savable.Category
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val productRequestFormat: RootJsonFormat[ProductDTO] = jsonFormat5(ProductDTO)
  implicit val productResponseFormat: RootJsonFormat[ProductResponseDTO] = jsonFormat8(ProductResponseDTO)
  implicit val productsFormat: RootJsonFormat[ProductsDTO] = jsonFormat1(ProductsDTO)
  implicit val categoryRequestFormat: RootJsonFormat[CategoryDTO] = jsonFormat1(CategoryDTO)
  implicit val categoryFormat: RootJsonFormat[Category] = jsonFormat2(Category)
  implicit val categoriesFormat: RootJsonFormat[CategoriesDTO] = jsonFormat1(CategoriesDTO)
}
