package com.hashini.services.cart.dto

import com.hashini.services.cart.persistence.model.savable.CartItem

case class CartItemDTO(productId: Int,
                       quantity: Int,
                       selected: Option[Boolean],
                       cartId: Option[Int],
                       id: Option[Int]) {

  def getCartItem: CartItem = {
    CartItem(productId,
      cartId.getOrElse(0),
      quantity,
      selected.getOrElse(true),
      id.getOrElse(0))
  }
}