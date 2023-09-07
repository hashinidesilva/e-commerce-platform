package com.hashini.services.order.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.order.dto.{OrderDTO, OrderItemDTO, OrderResponseDTO}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val orderItemDTOFormat: RootJsonFormat[OrderItemDTO] = jsonFormat2(OrderItemDTO)
  implicit val orderDTOFormat: RootJsonFormat[OrderDTO] = jsonFormat3(OrderDTO)
  implicit val orderResponseDTOFormat: RootJsonFormat[OrderResponseDTO] = jsonFormat5(OrderResponseDTO)

}