package com.hashini.services.user.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.user.api.conveter.JsonConverter
import com.hashini.services.user.handler.UserHandler

import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}

object UserRoutes extends JsonConverter {

  def route(userHandler: UserHandler): Route = pathPrefix("users" / IntNumber) { userId =>
    pathEnd {
      get {
        onComplete(userHandler.getUser(userId)) {
          case Success(userInfoTry) =>
            userInfoTry match {
              case Success(userInfo) =>
                complete(userInfo)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          case Failure(ex) =>
            complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
        }
      }
    }
  }
}