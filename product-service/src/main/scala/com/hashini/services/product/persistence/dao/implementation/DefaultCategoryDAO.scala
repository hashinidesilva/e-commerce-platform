package com.hashini.services.product.persistence.dao.implementation

import com.hashini.services.product.persistence.DatabaseConnector.db
import com.hashini.services.product.persistence.dao.CategoryDAO
import com.hashini.services.product.persistence.model.DAL._
import com.hashini.services.product.persistence.model.savable.Category
import com.hashini.services.product.util.PrivateExecutionContext.executionContext

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

class DefaultCategoryDAO extends CategoryDAO {

  import profile.api._

  override def loadCategoryByName(name: String): Future[Try[Category]] = {
    for {
      categoryOption <- db.run(categoryQuery.filter(_.name === name).result.headOption)
    } yield categoryOption match {
      case Some(category) =>
        Success(category)
      case None =>
        Failure(new Exception("Category not found"))
    }
  }

}