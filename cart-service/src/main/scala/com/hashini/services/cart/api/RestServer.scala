package com.hashini.services.cart.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import com.hashini.services.cart.api.routes.CartRoute
import com.hashini.services.cart.handler.CartHandler
import util.DefaultConfiguration

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer {

  implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "cart")
  implicit val executionContext: ExecutionContext = system.executionContext

  private val host = DefaultConfiguration.HTTP_HOST
  private val port = DefaultConfiguration.HTTP_PORT

  def createServer(cartHandler: CartHandler): Unit = {
    val server = Http().newServerAt(host, port).bind(CartRoute.route(cartHandler))

    server onComplete {
      case Success(_) =>
        println("Successfully started the server")
      case Failure(exception) =>
        println("An error occurred when starting the server" + exception.getMessage)
    }
  }
}