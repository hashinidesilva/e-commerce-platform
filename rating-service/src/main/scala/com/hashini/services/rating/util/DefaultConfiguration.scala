package com.hashini.services.rating.util

import com.typesafe.config.ConfigFactory

object DefaultConfiguration {

  private lazy val config = ConfigFactory.load()

  lazy val HTTP_PORT: Int = config.getInt("http.port")
  lazy val HTTP_HOST: String = config.getString("http.host")
  lazy val DB_URL: String = config.getString("postgres.properties.url")
  lazy val DB_USER: String = config.getString("postgres.properties.user")
  lazy val DB_PASSWORD: String = config.getString("postgres.properties.password")

}