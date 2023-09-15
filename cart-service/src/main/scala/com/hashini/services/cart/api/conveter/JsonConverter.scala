package com.hashini.services.cart.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.cart.dto.{CartDTO, CartItemDTO, CartResponseDTO}
import com.hashini.services.cart.persistence.model.savable.CartItem
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val cartItemDTOFormat: RootJsonFormat[CartItemDTO] = jsonFormat5(CartItemDTO)
  implicit val cartFormat: RootJsonFormat[CartDTO] = jsonFormat1(CartDTO)
  implicit val cartItemFormat: RootJsonFormat[CartItem] = jsonFormat5(CartItem)
  implicit val cartResponseFormat: RootJsonFormat[CartResponseDTO] = jsonFormat4(CartResponseDTO)

}