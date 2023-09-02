package com.hashini.services.product.dto

import com.hashini.services.product.persistence.model.savable.ProductItem

case class ProductDTO(name: String,
                      categoryId: Int,
                      unitPrice: Double,
                      description: String,
                      quantity: Int) {

  def getProductItem: ProductItem = {
    ProductItem(name, unitPrice, description, quantity, categoryId = categoryId)
  }
}