package com.hashini.services.order.persistence.model.savable

import com.hashini.services.order.api.conveter.TimestampConverter
import com.hashini.services.order.dto.OrderResponseDTO

import java.sql.Timestamp

case class Order(userId: Int,
                 totalAmount: Double,
                 address: String,
                 shippingAmount: Double,
                 status: String = "Order Confirmed",
                 orderDate: Timestamp = new Timestamp(System.currentTimeMillis()),
                 id: Int = 0) {

  def getOrderResponseDTO(items: Seq[OrderItem] = Seq()): OrderResponseDTO = {
    OrderResponseDTO(id,
      userId,
      totalAmount,
      shippingAmount,
      status,
      TimestampConverter.convertToString(orderDate),
      address,
      items.map(_.getOrderItemResponseDTO))
  }

}