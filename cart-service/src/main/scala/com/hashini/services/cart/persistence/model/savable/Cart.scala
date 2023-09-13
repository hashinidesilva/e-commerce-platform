package com.hashini.services.cart.persistence.model.savable

import com.hashini.services.cart.dto.CartDTO

import java.sql.Timestamp

case class Cart(userId: Int,
                createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                id: Int = 0) {

  def getCartDTO: CartDTO = {
    CartDTO(userId)
  }
}
