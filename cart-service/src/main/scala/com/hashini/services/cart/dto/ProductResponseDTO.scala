package com.hashini.services.cart.dto

case class ProductResponseDTO(id: Int,
                              categoryId: Int,
                              name: String,
                              unitPrice: Double,
                              description: String,
                              createdTime: String,
                              updatedTime: String)