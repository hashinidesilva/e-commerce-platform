package com.hashini.services.product.persistence

import slick.jdbc.PostgresProfile.api._

object DatabaseConnector {
  lazy val db = Database.forConfig("postgres")
}