package com.hashini.services.product.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.product.api.converter.JsonConverter
import com.hashini.services.product.dto.CategoryDTO
import com.hashini.services.product.handler.CategoryHandler

import scala.util.{Failure, Success}

object CategoryRoutes extends JsonConverter {

  def route(categoryHandler: CategoryHandler): Route = {
    pathPrefix("categories") {
      concat(
        pathEnd {
          get {
            onComplete(categoryHandler.getCategories) {
              case Success(categories) =>
                complete(categories)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        },
        pathEnd {
          post {
            entity(as[CategoryDTO]) { category =>
              onComplete(categoryHandler.addCategory(category)) {
                case Success(categoryResponse) =>
                  complete(categoryResponse)
                case Failure(ex) =>
                  complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            }
          }
        }
      )
    }
  }

}