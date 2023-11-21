package com.hashini.services.order.dto

import com.hashini.services.order.persistence.model.savable.{Order, OrderItem}

case class OrderDTO(userId: Int,
                    totalAmount: Double,
                    items: Seq[OrderItemDTO]) {

  def getOrder: Order = {
    Order(userId, totalAmount)
  }

  def getOrderItems(orderId: Int): Seq[OrderItem] = {
    items.map(_.getOrderItem(orderId))
  }

}