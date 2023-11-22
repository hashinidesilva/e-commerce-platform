package com.hashini.services.rating.persistence.model

import com.hashini.services.rating.persistence.model.savable.Rating
import slick.lifted.ProvenShape

import java.sql.Timestamp

trait RatingComponent {

  this: ProfileComponent =>

  import profile.api._

  class RatingTable(tag: Tag) extends Table[Rating](tag, _tableName = "ratings") {

    def id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)

    def productId: Rep[Int] = column[Int]("product_id")

    def userId: Rep[Int] = column[Int]("user_id")

    def rating: Rep[Int] = column[Int]("rating")

    def review: Rep[String] = column[String]("review")

    def createdTime: Rep[Timestamp] = column[Timestamp]("created_time")

    override def * : ProvenShape[Rating] = (productId,
      userId,
      rating,
      review,
      createdTime,
      id
    ) <> (Rating.tupled, Rating.unapply)
  }

  lazy val ratingQuery = TableQuery[RatingTable]

}