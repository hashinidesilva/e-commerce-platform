package com.hashini.services.order.persistence.model.savable

import com.hashini.services.order.api.conveter.TimestampConverter
import com.hashini.services.order.dto.OrderResponseDTO

import java.sql.Timestamp

case class Order(userId: Int,
                 totalAmount: Double,
                 status: String = "",
                 orderDate: Timestamp = new Timestamp(System.currentTimeMillis()),
                 id: Int = 0) {

  def getOrderResponseDTO: OrderResponseDTO = {
    OrderResponseDTO(id,
      userId,
      totalAmount,
      status,
      TimestampConverter.convertToString(orderDate))
  }

}