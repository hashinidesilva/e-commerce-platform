package com.hashini.services.order.dto

case class OrderItemResponseDTO(id: Int,
                                orderId: Int,
                                productId: Int,
                                quantity: Int,
                                unitPrice: Double,
                                subtotal: Double)