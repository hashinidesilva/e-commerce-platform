package com.hashini.services.rating.handler

import com.hashini.services.rating.dto.{ProductRatingDTO, RatingDTO, RatingResponseDTO, RatingsDTO}
import com.hashini.services.rating.persistence.dao.RatingDAO
import com.hashini.services.rating.rabbitmq.ProductClient
import spray.json.DefaultJsonProtocol._
import spray.json._

import scala.concurrent.{ExecutionContext, Future}

class RatingHandler(ratingDAO: RatingDAO,
                    productClient: ProductClient)(implicit execution_Context: ExecutionContext) {

  implicit val ratingFormatter: JsonFormat[ProductRatingDTO] = jsonFormat2(ProductRatingDTO)

  def getRatings(productId: Int): Future[RatingsDTO] = {
    for {
      ratings <- ratingDAO.getRatings(productId)
    } yield RatingsDTO(ratings.map(_.getRatingResponseDTO))
  }

  def addRating(newRating: RatingDTO): Future[RatingResponseDTO] = {
    for {
      rating <- ratingDAO.insert(newRating.getRating).map(_.getRatingResponseDTO)
      ratings <- ratingDAO.getRatings(rating.productId)
      averageRating = ratings.map(_.rating).sum.toDouble / ratings.map(_.rating).length
      _ = productClient.sendMessage(ProductRatingDTO(newRating.productId, averageRating).toJson.toString())
    } yield rating
  }

}