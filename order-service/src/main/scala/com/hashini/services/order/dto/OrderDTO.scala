package com.hashini.services.order.dto

case class OrderDTO(userId: Int,
                    items: Seq[OrderItemDTO])