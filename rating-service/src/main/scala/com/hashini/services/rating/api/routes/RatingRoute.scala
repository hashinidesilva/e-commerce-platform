package com.hashini.services.rating.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.rating.api.converter.JsonConverter
import com.hashini.services.rating.handler.RatingHandler

import scala.util.{Failure, Success}

object RatingRoute extends JsonConverter {

  def route(ratingHandler: RatingHandler): Route = pathPrefix("ratings") {
    pathEnd {
      get {
        parameters("productId".as[Int]) { productId =>
          onComplete(ratingHandler.getRatings(productId)) {
            case Success(ratings) =>
              complete(ratings)
            case Failure(ex) =>
              complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
          }
        }
      }
    }
  }

}