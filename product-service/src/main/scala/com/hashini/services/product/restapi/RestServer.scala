package com.hashini.services.product.restapi

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import com.hashini.services.product.handler.ProductHandler
import com.hashini.services.product.restapi.routes.ProductRoutes
import com.hashini.services.product.util.DefaultConfiguration

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(productHandler: ProductHandler) {

  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "product")
  implicit val executionContext: ExecutionContext = system.executionContext

  private val port = DefaultConfiguration.HTTP_PORT
  private val host = DefaultConfiguration.HTTP_HOST

  def createServer(): Unit = {
    val routes = ProductRoutes.route(productHandler)

    val server = Http().newServerAt(host, port).bind(routes)

    server onComplete {
      case Success(_) =>
        println("Successfully started the server")
      case Failure(exception) =>
        println("An error occurred when starting the server" + exception.getMessage)
    }
  }

}
