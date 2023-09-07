package com.hashini.services.order.dto

import com.hashini.services.order.persistence.model.savable.Order

case class OrderDTO(userId: Int,
                    totalAmount: Double,
                    items: Seq[OrderItemDTO]) {

  def getOrder: Order = {
    Order(userId, totalAmount)
  }

}