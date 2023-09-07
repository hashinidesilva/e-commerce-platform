package com.hashini.services.order.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import com.hashini.services.order.api.routes.OrderRoutes
import com.hashini.services.order.handler.OrderHandler
import com.hashini.services.order.util.DefaultConfiguration

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(orderHandler: OrderHandler) {
  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "order")
  implicit val executionContext: ExecutionContext = system.executionContext

  def createServer(): Unit = {

    val host = DefaultConfiguration.HTTP_HOST
    val port = DefaultConfiguration.HTTP_PORT
    val server = Http().newServerAt(host, port).bind(OrderRoutes.route(orderHandler))

    server onComplete {
      case Success(_) =>
        println("Successfully started the server")
      case Failure(exception) =>
        println("An error occurred when starting the server" + exception.getMessage)
    }
  }
}