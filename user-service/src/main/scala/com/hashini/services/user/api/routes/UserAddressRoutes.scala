package com.hashini.services.user.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.user.api.conveter.JsonConverter
import com.hashini.services.user.dto.AddressDTO
import com.hashini.services.user.handler.AddressHandler

import scala.util.{Failure, Success}

object UserAddressRoutes extends JsonConverter {

  def route(addressHandler: AddressHandler): Route = pathPrefix("users" / IntNumber / "addresses") { userId =>
    pathEnd {
      concat(
        post {
          entity(as[AddressDTO]) { address =>
            onComplete(addressHandler.addAddress(address, userId)) {
              case Success(address) =>
                complete(address)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        },
        get {
          onComplete(addressHandler.getAddresses(userId)) {
            case Success(addresses) =>
              complete(addresses)
            case Failure(ex) =>
              complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
          }
        }
      )
    }
  }
}