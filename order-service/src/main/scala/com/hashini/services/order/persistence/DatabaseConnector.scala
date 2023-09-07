package com.hashini.services.order.persistence

import slick.jdbc.PostgresProfile.api._

object DatabaseConnector {
  lazy val db = Database.forConfig("postgres")
}