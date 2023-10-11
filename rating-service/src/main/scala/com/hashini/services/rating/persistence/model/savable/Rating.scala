package com.hashini.services.rating.persistence.model.savable

import com.hashini.services.rating.dto.RatingResponseDTO

import java.sql.Timestamp

case class Rating(productId: Int,
                  userId: Int,
                  rating: Int,
                  createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                  id: Int = 0) {
  def getRatingResponseDTO: RatingResponseDTO = {
    RatingResponseDTO(productId, userId, rating, id)
  }
}
