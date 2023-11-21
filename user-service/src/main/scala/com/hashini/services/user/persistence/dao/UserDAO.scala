package com.hashini.services.user.persistence.dao

import com.hashini.services.user.persistence.model.savable.{Address, User}

import scala.concurrent.Future
import scala.util.Try

trait UserDAO {

  def load(id: Int): Future[Try[(User, Seq[Address])]]

}