package com.hashini.services.order.rabbitmq

import com.rabbitmq.client.BuiltinExchangeType
import com.typesafe.scalalogging.LazyLogging

class ProductClient(name: String) extends LazyLogging {
  private val queueName: String = name + "-order"
  private val exchangeName: String = name + "-exchange"
  private val connection = RabbitConnection.connection
  private val channel = connection.createChannel()
  createExchange()
  createQueue()
  channel.queueBind(queueName, exchangeName, "order")
  channel.confirmSelect()

  def sendMessage(message: String): Unit = {
    channel.basicPublish(exchangeName, "order", null, message.getBytes("UTF-8"))
    logger.info("Message sent: " + message)
  }

  private def createExchange() = {
    channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT, true, false, null)
  }

  private def createQueue() = {
    channel.queueDeclare(queueName, true, false, false, null)
  }

}