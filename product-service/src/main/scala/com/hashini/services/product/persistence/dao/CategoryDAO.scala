package com.hashini.services.product.persistence.dao

import com.hashini.services.product.persistence.model.savable.Category

import scala.concurrent.Future
import scala.util.Try

trait CategoryDAO {

  def loadCategoryByName(name: String): Future[Try[Category]]

}