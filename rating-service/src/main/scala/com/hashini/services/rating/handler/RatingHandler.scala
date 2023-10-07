package com.hashini.services.rating.handler

import com.hashini.services.rating.dto.RatingsDTO
import com.hashini.services.rating.persistence.dao.RatingDAO

import scala.concurrent.{ExecutionContext, Future}

class RatingHandler(ratingDAO: RatingDAO)(implicit execution_Context: ExecutionContext) {

  def getRatings(productId: Int): Future[RatingsDTO] = {
    for {
      ratings <- ratingDAO.getRatings(productId)
    } yield RatingsDTO(ratings.map(_.getRatingDTO))
  }

}