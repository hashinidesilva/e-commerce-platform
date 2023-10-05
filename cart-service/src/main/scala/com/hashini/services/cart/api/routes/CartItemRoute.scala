package com.hashini.services.cart.api.routes

import akka.http.scaladsl.model.StatusCodes.{InternalServerError, OK}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.cart.api.conveter.JsonConverter
import com.hashini.services.cart.dto.CartItemDTO
import com.hashini.services.cart.handler.CartHandler

import scala.util.{Failure, Success}

object CartItemRoute extends JsonConverter {

  def route(cartHandler: CartHandler): Route = pathPrefix("carts" / IntNumber / "items") { cartId =>
    concat(
      pathEnd {
        post {
          entity(as[CartItemDTO]) { item =>
            onComplete(cartHandler.addOrUpdateCartItem(item, cartId)) {
              case Success(cartResponse) =>
                complete(cartResponse)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      },
      path(IntNumber) { itemId =>
        concat(
          delete {
            onComplete(cartHandler.deleteItem(itemId)) {
              case Success(_) =>
                complete(OK)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          },
          put {
            entity(as[CartItemDTO]) { cart =>
              onComplete(cartHandler.updateItem(itemId, cart)) {
                case Success(_) =>
                  complete(OK)
                case Failure(ex) =>
                  complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            }
          }
        )
      }
    )
  }

}