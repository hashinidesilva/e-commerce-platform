package com.hashini.services.product.dto

import com.hashini.services.product.persistence.model.savable.Category

case class CategoriesDTO(items: Seq[Category])