package com.hashini.services.rating.persistence.dao.implementation

import com.hashini.services.rating.persistence.DatabaseConnector.db
import com.hashini.services.rating.persistence.dao.RatingDAO
import com.hashini.services.rating.persistence.model.DAL.{profile, ratingQuery}
import com.hashini.services.rating.persistence.model.savable.Rating

import scala.concurrent.Future

class DefaultRatingDAO extends RatingDAO {

  import profile.api._

  override def getRatings(productId: Int): Future[Seq[Rating]] = {
    db.run(ratingQuery.filter(_.productId === productId).result)
  }

  override def insert(rating: Rating): Future[Rating] = {
    db.run((ratingQuery returning ratingQuery) += rating)
  }
}