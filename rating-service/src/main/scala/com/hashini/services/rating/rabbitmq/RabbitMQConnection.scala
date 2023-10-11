package com.hashini.services.rating.rabbitmq

import com.rabbitmq.client.{Channel, ConnectionFactory}

object RabbitMQConnection {

  private val QUEUE_NAME: String = "product"

  def getChannel: Channel = {
    val factory = new ConnectionFactory
    factory.setHost("localhost")
    val connection = factory.newConnection()
    val channel = connection.createChannel()
    channel.queueDeclare(QUEUE_NAME, true, false, false, null)
    channel
  }

  def getQueueName: String = QUEUE_NAME

}