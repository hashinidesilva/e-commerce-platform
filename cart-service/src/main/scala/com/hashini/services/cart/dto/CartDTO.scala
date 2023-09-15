package com.hashini.services.cart.dto

import com.hashini.services.cart.persistence.model.savable.Cart

case class CartDTO(items: Seq[CartItemDTO]) {
  def getCart: Cart = {
    Cart(1)
  }
}
