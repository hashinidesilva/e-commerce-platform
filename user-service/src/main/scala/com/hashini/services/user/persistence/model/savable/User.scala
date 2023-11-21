package com.hashini.services.user.persistence.model.savable

import com.hashini.services.user.dto.UserResponseDTO

import java.sql.Timestamp

case class User(email: String,
                password: String,
                name: String,
                phoneNumber: Int,
                createdTime: Timestamp = new Timestamp(System.currentTimeMillis()),
                id: Int = 0) {

  def getUserResponseDTO: UserResponseDTO = {
    UserResponseDTO(id,
      email,
      name,
      phoneNumber,
      createdTime.toString)
  }
}