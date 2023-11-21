package com.hashini.services.user.persistence.dao.implementation

import com.hashini.services.user.persistence.DatabaseConnector.db
import com.hashini.services.user.persistence.dao.UserDAO
import com.hashini.services.user.persistence.model.DAL.{profile, userQuery}
import com.hashini.services.user.persistence.model.savable.User

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

class DefaultUserDAO(implicit executionContext: ExecutionContext) extends UserDAO {

  import profile.api._

  override def insertOrUpdate(user: User): Future[User] = {
    val query = for {
      userOption <- (userQuery returning userQuery).insertOrUpdate(user)
    } yield userOption.getOrElse(user)
    db.run(query)
  }

  override def load(id: Int): Future[Try[User]] = {
    val query = userQuery.filter(_.id === id).result

    for {
      results <- db.run(query)
    } yield results.headOption match {
      case Some(userInfo) =>
        Success(userInfo)
      case None =>
        Failure(new Exception(s"No user found for id: $id"))
    }
  }
}