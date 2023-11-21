package com.hashini.services.user.handler

import com.hashini.services.user.dto.{UserDTO, UserResponseDTO}
import com.hashini.services.user.persistence.dao.UserDAO

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class UserHandler(userDAO: UserDAO)(implicit executionContext: ExecutionContext) {

  def addUser(user: UserDTO): Future[UserResponseDTO] = {
    userDAO.insertOrUpdate(user.getUser).map(_.getUserResponseDTO)
  }

  def getUser(userId: Int)(implicit executionContext: ExecutionContext): Future[Try[UserResponseDTO]] = {
    userDAO.load(userId).map(_.map(_.getUserResponseDTO))
  }

}