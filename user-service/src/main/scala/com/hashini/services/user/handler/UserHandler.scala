package com.hashini.services.user.handler

import com.hashini.services.user.dto.UserDTO
import com.hashini.services.user.persistence.dao.UserDAO

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class UserHandler(userDAO: UserDAO) {

  def getUser(userId: Int)(implicit executionContext: ExecutionContext): Future[Try[UserDTO]] = {
    userDAO.load(userId).map(_.map(userInfo => userInfo._1.getUserDTO(userInfo._2)))
  }

}