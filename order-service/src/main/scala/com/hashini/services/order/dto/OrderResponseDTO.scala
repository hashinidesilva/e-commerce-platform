package com.hashini.services.order.dto

case class OrderResponseDTO(id: Int,
                            userId: Int,
                            totalAmount: Double,
                            status: String,
                            orderDate: String,
                            items: Seq[OrderItemResponseDTO] = Seq())