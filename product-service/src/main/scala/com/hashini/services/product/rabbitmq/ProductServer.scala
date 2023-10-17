package com.hashini.services.product.rabbitmq

import com.hashini.services.product.dto.ProductRatingDTO
import com.hashini.services.product.handler.ProductHandler
import com.hashini.services.product.util.PrivateExecutionContext.executionContext
import com.rabbitmq.client.AMQP.{Exchange, Queue}
import com.rabbitmq.client.{BuiltinExchangeType, CancelCallback, DeliverCallback}
import spray.json.DefaultJsonProtocol._
import spray.json._

import scala.util.{Failure, Success, Try}

class ProductServer(name: String,
                    handler: ProductHandler) {

  implicit val ratingFormatter: JsonFormat[ProductRatingDTO] = jsonFormat2(ProductRatingDTO)

  private val queueName = name
  private val exchangeName = name + "-exchange"
  private val connection = RabbitConnection.connection
  private val channel = connection.createChannel

  createExchange(exchangeName)
  createQueue(queueName)
  channel.queueBind(queueName, exchangeName, "")

  def start: String = {
    channel.basicConsume(queueName, true, deliverCallback, cancelCallback)
  }

  private val deliverCallback: DeliverCallback = (_, delivery) => {
    val message = new String(delivery.getBody, "UTF-8")
    val productRatingTry = Try {
      message.parseJson.convertTo[ProductRatingDTO]
    }
    productRatingTry match {
      case Success(productRatingDTO) =>
        handler.updateRating(productRatingDTO) onComplete {
          case Success(_) =>
            println(s"Successfully handled received message [$message]")
          case Failure(ex) =>
            println(s"Error occurred when handling received message [$message], $ex")
        }
      case Failure(ex) =>
        println(ex)
    }


  }

  private val cancelCallback: CancelCallback = _ => {}

  private def createExchange(exchangeName: String): Exchange.DeclareOk = {
    channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT, true, false, null)
  }

  private def createQueue(queueName: String): Queue.DeclareOk = {
    channel.queueDeclare(queueName, true, false, false, null)
  }
}