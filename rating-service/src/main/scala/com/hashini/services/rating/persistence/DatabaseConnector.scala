package com.hashini.services.rating.persistence

import slick.jdbc.PostgresProfile.api._

object DatabaseConnector {

  lazy val db = Database.forConfig("postgres")

}