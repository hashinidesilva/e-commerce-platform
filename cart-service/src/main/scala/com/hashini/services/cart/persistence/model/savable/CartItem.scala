package com.hashini.services.cart.persistence.model.savable

import com.hashini.services.cart.dto.{CartItemResponse, ProductResponseDTO}

case class CartItem(productId: Int,
                    cartId: Int,
                    quantity: Int,
                    selected: Boolean,
                    id: Int = 0) {
  def getCartItemResponse(product: Option[ProductResponseDTO]): CartItemResponse = {
    CartItemResponse(id,
      cartId,
      quantity,
      selected,
      product)
  }
}