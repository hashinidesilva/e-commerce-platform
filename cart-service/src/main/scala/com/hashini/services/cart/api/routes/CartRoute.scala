package com.hashini.services.cart.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.cart.api.conveter.JsonConverter
import com.hashini.services.cart.handler.CartHandler

import scala.util.{Failure, Success}

object CartRoute extends JsonConverter {
  def route(cartHandler: CartHandler): Route = pathPrefix("carts") {
    pathEnd {
      get {
        onComplete(cartHandler.getCart(1)) {
          case Success(cart) =>
            complete(cart)
          case Failure(ex) =>
            complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
        }

      }
    }
  }

}
