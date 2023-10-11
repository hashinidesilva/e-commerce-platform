package com.hashini.services.rating.rabbitmq

import com.rabbitmq.client.Channel

class Publisher {

  def publishMessage(message: String): Unit = {
    val channel = RabbitMQConnection.getChannel
    channel.basicPublish("", RabbitMQConnection.getQueueName, null,
      message.getBytes("UTF-8"))
    println("Message sent: " + message)
  }

}