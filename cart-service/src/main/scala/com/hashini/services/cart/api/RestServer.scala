package com.hashini.services.cart.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives.concat
import akka.http.scaladsl.server.Route
import com.hashini.services.cart.api.routes.{CartItemRoute, CartRoute}
import com.hashini.services.cart.handler.CartHandler
import com.hashini.services.cart.util.DefaultConfiguration
import com.typesafe.scalalogging.LazyLogging

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(cartHandler: CartHandler) extends CORSHandler with LazyLogging {

  implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "cart")
  implicit val executionContext: ExecutionContext = system.executionContext

  private val host = DefaultConfiguration.HTTP_HOST
  private val port = DefaultConfiguration.HTTP_PORT

  def createServer(): Unit = {
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
      concat(
        CartRoute.route(cartHandler),
        CartItemRoute.route(cartHandler)
      )
    }
  }
}