package com.hashini.services.user.util

import com.typesafe.config.ConfigFactory

object DefaultConfiguration {

  private val config = ConfigFactory.load()

  lazy val DB_URL: String = config.getString("postgres.properties.url")
  lazy val DB_USER: String = config.getString("postgres.properties.user")
  lazy val DB_PASSWORD: String = config.getString("postgres.properties.password")

}