package com.hashini.services.cart.api.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.StatusCodes.{InternalServerError, OK}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.cart.api.conveter.JsonConverter
import com.hashini.services.cart.dto.{CartDTO, UpdateCartItem}
import com.hashini.services.cart.handler.CartHandler

import scala.util.{Failure, Success}

object CartRoute extends JsonConverter {
  def route(cartHandler: CartHandler): Route = pathPrefix("carts") {
    concat(
      pathEnd {
        concat(
          get {
            onComplete(cartHandler.getCart(1)) {
              case Success(cartOption) =>
                cartOption match {
                  case Some(cart) =>
                    complete(cart)
                  case None =>
                    complete(StatusCodes.NoContent -> "No cart found")
                }
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          },
          post {
            entity(as[CartDTO]) { cart =>
              onComplete(cartHandler.addCart(cart)) {
                case Success(cartResponse) =>
                  complete(cartResponse)
                case Failure(ex) =>
                  complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            }
          },
        )
      },
      path(IntNumber) { cartId =>
        patch {
          entity(as[UpdateCartItem]) { cartItem =>
            onComplete(cartHandler.updateSelected(cartId, cartItem.selected)) {
              case Success(_) =>
                complete(OK)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      }
    )
  }

}