package com.hashini.services.order.handler

import com.hashini.services.order.dto.{OrderDTO, OrderResponseDTO}
import com.hashini.services.order.persistence.dao.OrderDAO

import scala.concurrent.{ExecutionContext, Future}

class OrderHandler(orderDAO: OrderDAO)(implicit executionContext: ExecutionContext) {

  def getOrders(userId: Int): Future[Seq[OrderResponseDTO]] = {
    for {
      orders <- orderDAO.search(userId)
    } yield orders.map(_.getOrderResponseDTO)
  }

  def addOrder(orderDTO: OrderDTO): Future[OrderResponseDTO] = {
    val order = orderDAO.insertOrder(orderDTO.getOrder)
    order.map(_.getOrderResponseDTO)
  }

}