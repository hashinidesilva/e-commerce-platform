package com.hashini.services.rating.rabbitmq

import com.rabbitmq.client.AMQP.{Exchange, Queue}
import com.rabbitmq.client.BuiltinExchangeType
import com.typesafe.scalalogging.LazyLogging

class ProductClient(name: String) extends LazyLogging {

  private val queueName: String = name + "-rating"
  private val exchangeName: String = queueName + "-exchange"
  private val connection = RabbitConnection.connection
  private val channel = connection.createChannel()
  createExchange()
  createQueue()
  channel.queueBind(queueName, exchangeName, "rating")
  channel.confirmSelect()

  def sendMessage(message: String): Unit = {
    channel.basicPublish(exchangeName, "rating", null, message.getBytes("UTF-8"))
    logger.info("Message sent: " + message)
  }

  private def createExchange(): Exchange.DeclareOk = {
    channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT, true, false, null)
  }

  private def createQueue(): Queue.DeclareOk = {
    channel.queueDeclare(queueName, true, false, false, null)
  }
}