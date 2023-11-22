package com.hashini.services.order.persistence.dao

import com.hashini.services.order.persistence.model.savable.OrderItem

import scala.concurrent.Future

trait OrderItemDAO {

  def insertOrderItems(orderItems: Seq[OrderItem]): Future[Seq[OrderItem]]

  def getItems(orderId: Int): Future[Seq[OrderItem]]

}