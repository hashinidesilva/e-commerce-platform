package com.hashini.services.rating.persistence.model.savable

import com.hashini.services.rating.dto.RatingDTO

import java.sql.Timestamp

case class Rating(productId: Int,
                  userId: Int,
                  rating: Int,
                  createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                  id: Int = 0) {
  def getRatingDTO: RatingDTO = {
    RatingDTO(productId, userId, rating, id)
  }
}
