package com.hashini.services.user.persistence.model.savable

import com.hashini.services.user.dto.AddressResponseDTO

case class Address(fullName: String,
                   phoneNumber: Int,
                   address: String,
                   province: String,
                   city: String,
                   postalCode: Int,
                   userId: Int,
                   isDefault: Boolean = false,
                   id: Int = 0) {

  def getAddressResponseDTO: AddressResponseDTO = {
    AddressResponseDTO(fullName, phoneNumber, address, province, city, postalCode, userId, isDefault, id)
  }
}