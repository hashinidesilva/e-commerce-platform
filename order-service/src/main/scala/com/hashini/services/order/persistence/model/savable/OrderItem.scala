package com.hashini.services.order.persistence.model.savable

import com.hashini.services.order.dto.OrderItemResponseDTO

case class OrderItem(productId: Int,
                     orderId: Int,
                     quantity: Int,
                     unitPrice: Double,
                     subtotal: Double,
                     id: Int = 0) {

  def getOrderItemResponseDTO: OrderItemResponseDTO = {
    OrderItemResponseDTO(id,
      orderId,
      productId,
      quantity,
      unitPrice,
      subtotal)
  }
}