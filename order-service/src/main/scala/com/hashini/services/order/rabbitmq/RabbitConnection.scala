package com.hashini.services.order.rabbitmq

import com.hashini.services.order.util.DefaultConfiguration
import com.rabbitmq.client.{Connection, ConnectionFactory}

object RabbitConnection {
  private val host = DefaultConfiguration.AMQP_HOST
  private val user = DefaultConfiguration.AMQP_USER
  private val password = DefaultConfiguration.AMQP_PASSWORD

  def connection: Connection = {
    val factory = new ConnectionFactory
    factory.setHost(host)
    factory.setUsername(user)
    factory.setPassword(password)
    factory.newConnection()
  }
}