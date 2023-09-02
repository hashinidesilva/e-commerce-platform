package com.hashini.services.product.persistence.model.savable

import com.hashini.services.product.api.converter.TimestampConverter
import com.hashini.services.product.dto.ProductResponseDTO

import java.sql.Timestamp

case class ProductItem(name: String,
                       unitPrice: Double,
                       description: String,
                       quantity: Int,
                       createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                       updatedTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                       id: Int = 0,
                       categoryId: Int = 0) {

  def getProductResponseDTO: ProductResponseDTO = {
    ProductResponseDTO(id,
      categoryId,
      name,
      unitPrice,
      description,
      TimestampConverter.convertToString(createdTime),
      TimestampConverter.convertToString(updatedTime))
  }
}