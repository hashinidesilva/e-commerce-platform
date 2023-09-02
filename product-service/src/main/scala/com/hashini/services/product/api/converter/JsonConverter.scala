package com.hashini.services.product.api.converter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.product.dto.{ProductDTO, ProductResponseDTO, ProductsDTO}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val productRequestFormat: RootJsonFormat[ProductDTO] = jsonFormat5(ProductDTO)
  implicit val productResponseFormat: RootJsonFormat[ProductResponseDTO] = jsonFormat7(ProductResponseDTO)
  implicit val productsFormat: RootJsonFormat[ProductsDTO] = jsonFormat1(ProductsDTO)
}
