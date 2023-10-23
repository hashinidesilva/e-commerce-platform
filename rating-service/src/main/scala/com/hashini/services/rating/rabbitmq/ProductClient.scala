package com.hashini.services.rating.rabbitmq

import com.rabbitmq.client.AMQP.{Exchange, Queue}
import com.rabbitmq.client.{BuiltinExchangeType, Channel}
import com.typesafe.scalalogging.LazyLogging

class ProductClient(name: String) extends LazyLogging {

  private val queueName: String = name
  private val exchangeName: String = queueName + "-exchange"
  private val connection = RabbitConnection.connection
  private val channel = connection.createChannel()
  createExchange(channel)
  createQueue(channel)
  channel.queueBind(queueName, exchangeName, "")
  channel.confirmSelect()

  def sendMessage(message: String): Unit = {
    channel.basicPublish(exchangeName, "", null, message.getBytes("UTF-8"))
    logger.info("Message sent: " + message)
  }

  private def createExchange(channel: Channel): Exchange.DeclareOk = {
    channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT, true, false, null)
  }

  private def createQueue(channel: Channel): Queue.DeclareOk = {
    channel.queueDeclare(queueName, true, false, false, null)
  }
}