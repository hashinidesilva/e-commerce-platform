package com.hashini.services.order.dto

case class OrderResponseDTO(id: Int,
                            userId: Int,
                            totalAmount: Double,
                            shippingAmount: Double,
                            status: String,
                            orderDate: String,
                            address: String,
                            items: Seq[OrderItemResponseDTO] = Seq())