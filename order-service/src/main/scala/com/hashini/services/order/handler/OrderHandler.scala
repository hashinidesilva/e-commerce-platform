package com.hashini.services.order.handler

import com.hashini.services.order.dto.{OrderDTO, OrderResponseDTO}
import com.hashini.services.order.persistence.dao.{OrderDAO, OrderItemDAO}
import com.hashini.services.order.rabbitmq.ProductClient
import com.hashini.services.order.rabbitmq.dto.{ProductQuantityDTO, UpdateProductsDTO}
import spray.json.DefaultJsonProtocol._
import spray.json._

import scala.concurrent.{ExecutionContext, Future}

class OrderHandler(orderDAO: OrderDAO,
                   orderItemDAO: OrderItemDAO,
                   productClient: ProductClient)(implicit executionContext: ExecutionContext) {

  implicit val productQuantityFormatter: JsonFormat[ProductQuantityDTO] = jsonFormat2(ProductQuantityDTO)
  implicit val productsFormatter: JsonFormat[UpdateProductsDTO] = jsonFormat1(UpdateProductsDTO)

  def getOrders(userId: Int): Future[Seq[OrderResponseDTO]] = {
    for {
      orders <- orderDAO.search(userId)
    } yield orders.map(_.getOrderResponseDTO())
  }

  def addOrder(orderDTO: OrderDTO): Future[OrderResponseDTO] = {
    for {
      order <- orderDAO.insertOrder(orderDTO.getOrder)
      orderItems <- orderItemDAO.insertOrderItems(orderDTO.getOrderItems(order.id))
      _ = productClient.sendMessage(UpdateProductsDTO(orderDTO.items.map(_.getProductQuantityDTO)).toJson.toString())
    } yield order.getOrderResponseDTO(orderItems)
  }

}