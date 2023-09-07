package com.hashini.services.order.api.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.order.api.conveter.JsonConverter
import com.hashini.services.order.dto.OrderDTO
import com.hashini.services.order.handler.OrderHandler

object OrderRoutes extends JsonConverter {
  def route(orderHandler: OrderHandler): Route = pathPrefix("orders") {
    pathEnd {
      concat(
        get {
          complete("GET 200")
        },
        post {
          entity(as[OrderDTO]) { order =>
            val x = orderHandler.addOrder(order)
            complete("POST 200")
          }
        }
      )
    }
  }

}