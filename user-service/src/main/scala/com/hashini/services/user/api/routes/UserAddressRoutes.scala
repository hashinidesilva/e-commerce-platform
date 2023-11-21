package com.hashini.services.user.api.routes

import akka.http.scaladsl.model.StatusCodes.{InternalServerError, OK}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.user.api.conveter.JsonConverter
import com.hashini.services.user.dto.AddressDTO
import com.hashini.services.user.handler.AddressHandler

import scala.util.{Failure, Success}

object UserAddressRoutes extends JsonConverter {

  def route(addressHandler: AddressHandler): Route = pathPrefix("users" / IntNumber / "addresses") { userId =>
    concat(
      pathEnd {
        concat(
          post {
            entity(as[AddressDTO]) { newAddress =>
              onComplete(addressHandler.addAddress(newAddress, userId)) {
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
      },
      path(IntNumber) { addressId =>
        concat(
          put {
            entity(as[AddressDTO]) { updatedAddress =>
              onComplete(addressHandler.updateAddress(updatedAddress, userId, addressId)) {
                case Success(address) =>
                  complete(address)
                case Failure(ex) =>
                  complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            }
          },
          delete {
            onComplete(addressHandler.deleteAddress(addressId)) {
              case Success(_) =>
                complete(OK)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        )
      }
    )
  }
}