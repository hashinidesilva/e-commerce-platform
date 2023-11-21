package com.hashini.services.order.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import com.hashini.services.order.api.routes.OrderRoutes
import com.hashini.services.order.handler.OrderHandler
import com.hashini.services.order.util.DefaultConfiguration
import com.typesafe.scalalogging.LazyLogging

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(orderHandler: OrderHandler) extends CORSHandler with LazyLogging {
  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "order")
  implicit val executionContext: ExecutionContext = system.executionContext

  def createServer(): Unit = {

    val host = DefaultConfiguration.HTTP_HOST
    val port = DefaultConfiguration.HTTP_PORT
    val server = Http().newServerAt(host, port).bind(createRoute())

    server onComplete {
      case Success(_) =>
        logger.info("Successfully started the server")
      case Failure(exception) =>
        logger.error("An error occurred when starting the server", exception)
    }
  }

  private def createRoute(): Route = {
    corsHandler {
      OrderRoutes.route(orderHandler)
    }
  }
}