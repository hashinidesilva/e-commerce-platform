package com.hashini.services.product.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.product.api.routes.{CategoryRoutes, ProductRoutes}
import com.hashini.services.product.handler.{CategoryHandler, ProductHandler}
import com.hashini.services.product.util.DefaultConfiguration
import com.typesafe.scalalogging.LazyLogging

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(productHandler: ProductHandler,
                 categoryHandler: CategoryHandler) extends CORSHandler with LazyLogging {

  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "product")
  implicit val executionContext: ExecutionContext = system.executionContext

  private val port = DefaultConfiguration.HTTP_PORT
  private val host = DefaultConfiguration.HTTP_HOST

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
        ProductRoutes.route(productHandler),
        CategoryRoutes.route(categoryHandler)
      )
    }
  }

}