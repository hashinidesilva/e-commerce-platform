package com.hashini.services.cart.dto

import com.hashini.services.cart.persistence.model.savable.CartItem

case class CartResponseDTO(id: Int,
                           userId: Int,
                           createdTime: String,
                           items: Seq[CartItem])