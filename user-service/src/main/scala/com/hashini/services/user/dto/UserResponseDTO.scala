package com.hashini.services.user.dto

case class UserResponseDTO(id: Int,
                           email: String,
                           name: String,
                           phoneNumber: Int,
                           createdTime: String)