package com.hashini.services.product.handler

import com.hashini.services.product.dto.{CategoriesDTO, CategoryDTO}
import com.hashini.services.product.persistence.dao.CategoryDAO
import com.hashini.services.product.persistence.model.savable.Category

import scala.concurrent.{ExecutionContext, Future}

class CategoryHandler(categoryDAO: CategoryDAO)(implicit executionContext: ExecutionContext) {

  def addCategory(categoryDTO: CategoryDTO): Future[Category] = {
    categoryDAO.addCategory(categoryDTO.getCategory)
  }

  def getCategories: Future[CategoriesDTO] = {
    categoryDAO.search().map(CategoriesDTO)
  }

}