package com.hashini.services.order.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.order.api.conveter.JsonConverter
import com.hashini.services.order.dto.OrderDTO
import com.hashini.services.order.handler.OrderHandler

import scala.util.{Failure, Success}

object OrderRoutes extends JsonConverter {
  def route(orderHandler: OrderHandler): Route = pathPrefix("orders") {
    pathEnd {
      concat(
        get {
          onComplete(orderHandler.getOrders(1)) {
            case Success(orders) =>
              complete(orders)
            case Failure(ex) =>
              complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
          }
        },
        post {
          entity(as[OrderDTO]) { order =>
            onComplete(orderHandler.addOrder(order)) {
              case Success(order) =>
                complete(order)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      )
    }
  }

}