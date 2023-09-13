package com.hashini.services.cart.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.cart.dto.CartDTO
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val cartFormat: RootJsonFormat[CartDTO] = jsonFormat1(CartDTO)

}