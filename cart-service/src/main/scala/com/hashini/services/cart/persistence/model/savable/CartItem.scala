package com.hashini.services.cart.persistence.model.savable

case class CartItem(productId: Int,
                    cartId: Int,
                    quantity: Int,
                    selected: Boolean,
                    id: Int = 0)