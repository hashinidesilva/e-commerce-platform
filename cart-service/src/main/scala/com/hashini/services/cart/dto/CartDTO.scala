package com.hashini.services.cart.dto

import com.hashini.services.cart.persistence.model.savable.Cart

case class CartDTO(userId: Int) {

  def getCart: Cart = {
    Cart(userId)
  }
}