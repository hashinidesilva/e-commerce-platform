package com.hashini.services.rating.dto

import com.hashini.services.rating.persistence.model.savable.Rating

case class RatingDTO(productId: Int,
                     userId: Int,
                     rating: Int) {

  def getRating: Rating = {
    Rating(productId, userId, rating)
  }
}