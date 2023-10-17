package com.hashini.services.rating.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import com.hashini.services.rating.api.routes.RatingRoute
import com.hashini.services.rating.handler.RatingHandler
import com.hashini.services.rating.rabbitmq.ProductClient
import com.hashini.services.rating.util.DefaultConfiguration

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(ratingHandler: RatingHandler) {

  implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "rating")
  implicit val executionContext: ExecutionContext = system.executionContext

  private val host = DefaultConfiguration.HTTP_HOST
  private val port = DefaultConfiguration.HTTP_PORT

  def createServer(): Unit = {
    val server = Http().newServerAt(host, port).bind(createRoute())

    server onComplete {
      case Success(_) =>
        println("Successfully started the server")
      case Failure(exception) =>
        println("An error occurred when starting the server" + exception.getMessage)
    }
  }

  private def createRoute(): Route = {
    RatingRoute.route(ratingHandler)
  }

}