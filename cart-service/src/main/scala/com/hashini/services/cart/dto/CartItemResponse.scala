package com.hashini.services.cart.dto

case class CartItemResponse(id: Int,
                            cartId: Int,
                            quantity: Int,
                            selected: Boolean,
                            product: Option[ProductResponseDTO])