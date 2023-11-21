package com.hashini.services.product.rabbitmq

import com.hashini.services.product.dto.ProductRatingDTO
import com.hashini.services.product.handler.ProductHandler
import com.hashini.services.product.rabbitmq.dto.{ProductQuantityDTO, UpdateProductsDTO}
import com.hashini.services.product.util.PrivateExecutionContext.executionContext
import com.rabbitmq.client.AMQP.{Exchange, Queue}
import com.rabbitmq.client.{BuiltinExchangeType, CancelCallback, DeliverCallback}
import com.typesafe.scalalogging.LazyLogging
import spray.json.DefaultJsonProtocol._
import spray.json._

import scala.util.{Failure, Success, Try}

class ProductServer(name: String,
                    handler: ProductHandler) extends LazyLogging {

  implicit val ratingFormatter: JsonFormat[ProductRatingDTO] = jsonFormat2(ProductRatingDTO)
  implicit val productItemFormatter: JsonFormat[ProductQuantityDTO] = jsonFormat2(ProductQuantityDTO)
  implicit val updateProductsQuantityFormatter: JsonFormat[UpdateProductsDTO] = jsonFormat1(UpdateProductsDTO)

  private val ratingQueueName = name + "-rating"
  private val orderQueueName = name + "-order"
  private val exchangeName = name + "-exchange"
  private val connection = RabbitConnection.connection
  private val channel = connection.createChannel

  createExchange(exchangeName)
  createQueue(ratingQueueName)
  createQueue(orderQueueName)
  channel.queueBind(ratingQueueName, exchangeName, "rating")
  channel.queueBind(orderQueueName, exchangeName, "order")

  def start: String = {
    channel.basicConsume(ratingQueueName, true, ratingDeliverCallback, cancelCallback)
    channel.basicConsume(orderQueueName, true, orderDeliverCallback, cancelCallback)
  }

  private val ratingDeliverCallback: DeliverCallback = (_, delivery) => {
    val message = new String(delivery.getBody, "UTF-8")
    val productRatingTry = Try {
      message.parseJson.convertTo[ProductRatingDTO]
    }
    productRatingTry match {
      case Success(productRatingDTO) =>
        handler.updateRating(productRatingDTO) onComplete {
          case Success(_) =>
            logger.info(s"Successfully handled product rating update message [$message]")
          case Failure(ex) =>
            logger.error(s"Error occurred when handling product rating update message [$message]", ex)
        }
      case Failure(ex) =>
        logger.error("Error occurred when handling product rating update message", ex)
    }
  }

  private val orderDeliverCallback: DeliverCallback = (_, delivery) => {
    val message = new String(delivery.getBody, "UTF-8")
    val updateProductsQuantityTry = Try {
      message.parseJson.convertTo[UpdateProductsDTO]
    }
    updateProductsQuantityTry match {
      case Success(updateProductsQuantity) =>
        handler.updateQuantity(updateProductsQuantity.items) onComplete {
          case Success(_) =>
            logger.info(s"Successfully handled products quantity update message [$message]")
          case Failure(ex) =>
            logger.error(s"Error occurred when handling products quantity update message [$message]", ex)
        }
      case Failure(ex) =>
        logger.error("Error occurred when handling products quantity update message", ex)
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