package com.hashini.services.user.persistence.dao.implementation

import com.hashini.services.user.persistence.DatabaseConnector.db
import com.hashini.services.user.persistence.dao.UserDAO
import com.hashini.services.user.persistence.model.DAL.{addressQuery, profile, userQuery}
import com.hashini.services.user.persistence.model.savable.{Address, User}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

class DefaultUserDAO(implicit executionContext: ExecutionContext) extends UserDAO {

  import profile.api._

  override def load(id: Int): Future[Try[(User, Seq[Address])]] = {
    val query = for {
      queryResult <- (userQuery.filter(_.id === id) joinLeft addressQuery on (_.id === _.userId)).result
    } yield queryResult.groupBy(_._1).map {
      case (user, info) => (user, info.flatMap(_._2).distinct)
    }

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