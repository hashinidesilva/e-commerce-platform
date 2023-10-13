package com.hashini.services.rating.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.rating.api.converter.JsonConverter
import com.hashini.services.rating.dto.RatingDTO
import com.hashini.services.rating.handler.RatingHandler
import com.hashini.services.rating.rabbitmq.ProductClient

import scala.util.{Failure, Success}

object RatingRoute extends JsonConverter {

  def route(ratingHandler: RatingHandler,
            productClient: ProductClient): Route = pathPrefix("ratings") {
    pathEnd {
      concat(
        get {
          parameters("productId".as[Int]) { productId =>
            onComplete(ratingHandler.getRatings(productId)) {
              case Success(ratings) =>
                complete(ratings)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        },
        post {
          entity(as[RatingDTO]) { newRating =>
            onComplete(ratingHandler.addRating(newRating)) {
              case Success(rating) =>
                productClient.sendMessage(rating.toString)
                complete(rating)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      )
    }
  }

}