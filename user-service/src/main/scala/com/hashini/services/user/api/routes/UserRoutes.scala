package com.hashini.services.user.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.user.api.conveter.JsonConverter
import com.hashini.services.user.dto.UserDTO
import com.hashini.services.user.handler.UserHandler

import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}

object UserRoutes extends JsonConverter {

  def route(userHandler: UserHandler): Route = pathPrefix("users") {
    concat(
      post {
        entity(as[UserDTO]) { newUser =>
          onComplete(userHandler.addUser(newUser)) {
            case Success(user) =>
              complete(user)
            case Failure(ex) =>
              complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
          }
        }
      },
      path(IntNumber) { userId =>
        pathEnd {
          get {
            onComplete(userHandler.getUser(userId)) {
              case Success(userTry) =>
                userTry match {
                  case Success(user) =>
                    complete(user)
                  case Failure(ex) =>
                    complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
                }
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      }
    )
  }
}