package com.hashini.services.rating

import com.hashini.services.rating.api.RestServer
import com.hashini.services.rating.handler.RatingHandler
import com.hashini.services.rating.persistence.MigrateDatabaseSchema
import com.hashini.services.rating.persistence.dao.implementation.DefaultRatingDAO
import com.hashini.services.rating.rabbitmq.Publisher

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val ratingDAO = new DefaultRatingDAO()
  private val ratingHandler = new RatingHandler(ratingDAO)
  private val publisher = new Publisher

  new RestServer(ratingHandler, publisher).createServer()
  MigrateDatabaseSchema.migrate()

}