package com.hashini.services.order.dto

import com.hashini.services.order.persistence.model.savable.{Order, OrderItem}

case class OrderDTO(userId: Int,
                    totalAmount: Double,
                    address: String,
                    shippingAmount: Double,
                    items: Seq[OrderItemDTO]) {

  def getOrder: Order = {
    Order(userId, totalAmount, address, shippingAmount)
  }

  def getOrderItems(orderId: Int): Seq[OrderItem] = {
    items.map(_.getOrderItem(orderId))
  }

}