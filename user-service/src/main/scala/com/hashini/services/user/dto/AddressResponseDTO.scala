package com.hashini.services.user.dto

case class AddressResponseDTO(name: String,
                              phoneNumber: Int,
                              address: String,
                              province: String,
                              city: String,
                              postalCode: Int,
                              userId: Int,
                              isDefault: Boolean,
                              id: Int)
