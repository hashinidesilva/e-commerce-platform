package com.hashini.services.order.persistence.model.savable

case class OrderItem(productId: Int,
                     orderId: Int,
                     quantity: Int,
                     unitPrice: Double,
                     subtotal: Double,
                     id: Int = 0)