package com.hashini.services.user.dto

import com.hashini.services.user.persistence.model.savable.Address

case class AddressDTO(fullName: String,
                      phoneNumber: Int,
                      address: String,
                      province: String,
                      city: String,
                      postalCode: Int,
                      isDefault: Boolean,
                      id: Option[Int]) {
  def getAddress(userId: Int): Address = {
    Address(fullName,
      phoneNumber,
      address,
      province,
      city,
      postalCode,
      userId,
      isDefault,
      id.getOrElse(0))
  }
}