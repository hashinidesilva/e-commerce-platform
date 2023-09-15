package com.hashini.services.cart.persistence.model.savable

import com.hashini.services.cart.api.conveter.TimestampConverter
import com.hashini.services.cart.dto.CartResponseDTO

import java.sql.Timestamp

case class Cart(userId: Int,
                createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                id: Int = 0) {

  def getCartResponseDTO(items: Seq[CartItem]): CartResponseDTO = {
    CartResponseDTO(id, userId, TimestampConverter.convertToString(createdTime), items)
  }
}
