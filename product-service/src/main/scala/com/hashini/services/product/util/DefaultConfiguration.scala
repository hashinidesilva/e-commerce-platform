package com.hashini.services.product.util

import com.typesafe.config.{Config, ConfigFactory}

object DefaultConfiguration {

  private lazy val config: Config = ConfigFactory.load()

  lazy val HTTP_PORT: Int = config.getInt("http.port")
  lazy val HTTP_HOST: String = config.getString("http.host")
  lazy val DB_URL: String = config.getString("db.url")
  lazy val DB_USER: String = config.getString("db.user")
  lazy val DB_PASSWORD: String = config.getString("db.password")

}