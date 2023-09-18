package com.hashini.services.cart.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.cart.dto.{CartDTO, CartItemDTO, CartItemResponse, CartResponseDTO, ProductResponseDTO}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val cartItemFormat: RootJsonFormat[CartItemDTO] = jsonFormat5(CartItemDTO)
  implicit val cartFormat: RootJsonFormat[CartDTO] = jsonFormat1(CartDTO)
  implicit val productFormat: RootJsonFormat[ProductResponseDTO] = jsonFormat7(ProductResponseDTO)
  implicit val cartItemResponseFormat: RootJsonFormat[CartItemResponse] = jsonFormat5(CartItemResponse)
  implicit val cartResponseFormat: RootJsonFormat[CartResponseDTO] = jsonFormat4(CartResponseDTO)

}