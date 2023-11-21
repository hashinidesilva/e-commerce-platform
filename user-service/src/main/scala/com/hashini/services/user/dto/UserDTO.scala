package com.hashini.services.user.dto

import com.hashini.services.user.persistence.model.savable.User

case class UserDTO(email: String,
                   name: String,
                   phoneNumber: Int,
                   id: Option[Int]) {

  def getUser: User = {
    User(email,
      "",
      name,
      phoneNumber,
      id = id.getOrElse(0))
  }
}