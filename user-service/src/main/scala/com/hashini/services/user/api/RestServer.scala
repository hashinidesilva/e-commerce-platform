package com.hashini.services.user.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.{Directives, Route}
import com.hashini.services.user.api.routes.{UserAddressRoutes, UserRoutes}
import com.hashini.services.user.handler.{AddressHandler, UserHandler}
import com.hashini.services.user.util.DefaultConfiguration
import com.typesafe.scalalogging.LazyLogging

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class RestServer(userHandler: UserHandler,
                 addressHandler: AddressHandler) extends CORSHandler with LazyLogging {

  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "user")
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
      Directives.concat(
        UserRoutes.route(userHandler),
        UserAddressRoutes.route(addressHandler)
      )
    }
  }

}