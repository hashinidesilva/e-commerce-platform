package com.hashini.services.order.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.order.dto._
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val orderItemDTOFormat: RootJsonFormat[OrderItemDTO] = jsonFormat4(OrderItemDTO)
  implicit val orderDTOFormat: RootJsonFormat[OrderDTO] = jsonFormat5(OrderDTO)
  implicit val orderItemResponseDTOFormat: RootJsonFormat[OrderItemResponseDTO] = jsonFormat6(OrderItemResponseDTO)
  implicit val orderResponseDTOFormat: RootJsonFormat[OrderResponseDTO] = jsonFormat8(OrderResponseDTO)

}