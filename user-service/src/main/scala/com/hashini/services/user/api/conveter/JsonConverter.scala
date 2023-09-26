package com.hashini.services.user.api.conveter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.user.dto.{AddressDTO, AddressResponseDTO}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val addressResponseDTO: RootJsonFormat[AddressResponseDTO] = jsonFormat9(AddressResponseDTO)
  implicit val addressDTO: RootJsonFormat[AddressDTO] = jsonFormat8(AddressDTO)

}