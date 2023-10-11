package com.hashini.services.rating.persistence.dao

import com.hashini.services.rating.persistence.model.savable.Rating

import scala.concurrent.Future

trait RatingDAO {

  def getRatings(productId: Int): Future[Seq[Rating]]

  def insert(rating: Rating): Future[Rating]

}