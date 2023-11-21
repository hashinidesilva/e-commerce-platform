package com.hashini.services.user.dto

case class UserDTO(id: Int,
                   email: String,
                   name: String,
                   phoneNumber: Int,
                   createdTime: String,
                   addresses: Seq[AddressResponseDTO])