package com.hashini.services.user.persistence.dao

import com.hashini.services.user.persistence.model.savable.User

import scala.concurrent.Future
import scala.util.Try

trait UserDAO {

  def load(id: Int): Future[Try[User]]

  def insertOrUpdate(user: User): Future[User]

}