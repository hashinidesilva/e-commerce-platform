package com.hashini.services.order.dto

import com.hashini.services.order.rabbitmq.dto.ProductQuantityDTO

case class OrderItemDTO(productId: Int,
                        quantity: Int) {

  def getProductQuantityDTO: ProductQuantityDTO = {
    ProductQuantityDTO(productId, quantity)
  }
}