package com.hashini.services.order.dto

import com.hashini.services.order.persistence.model.savable.OrderItem
import com.hashini.services.order.rabbitmq.dto.ProductQuantityDTO

case class OrderItemDTO(productId: Int,
                        quantity: Int,
                        unitPrice: Double,
                        subTotal: Double) {

  def getProductQuantityDTO: ProductQuantityDTO = {
    ProductQuantityDTO(productId, quantity)
  }

  def getOrderItem(orderId: Int): OrderItem = {
    OrderItem(productId,
      orderId,
      quantity,
      unitPrice,
      subTotal
    )
  }
}