package com.hashini.services.rating.dto

case class RatingResponseDTO(productId: Int,
                             userId: Int,
                             rating: Int,
                             id: Int)