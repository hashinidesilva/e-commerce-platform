package com.hashini.services.order.util

import com.typesafe.config.{Config, ConfigFactory}

object DefaultConfiguration {
  private lazy val config: Config = ConfigFactory.load()

  lazy val HTTP_HOST: String = config.getString("http.host")
  lazy val HTTP_PORT: Int = config.getInt("http.port")
  lazy val DB_URL: String = config.getString("postgres.properties.url")
  lazy val DB_USER: String = config.getString("postgres.properties.user")
  lazy val DB_PASSWORD: String = config.getString("postgres.properties.password")

  lazy val AMQP_HOST: String = config.getString("amqp.host")
  lazy val AMQP_USER: String = config.getString("amqp.username")
  lazy val AMQP_PASSWORD: String = config.getString("amqp.password")
}