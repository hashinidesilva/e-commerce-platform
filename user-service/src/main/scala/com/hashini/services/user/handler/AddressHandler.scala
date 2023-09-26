package com.hashini.services.user.handler

import com.hashini.services.user.dto.{AddressDTO, AddressResponseDTO}
import com.hashini.services.user.persistence.dao.AddressDAO

import scala.concurrent.{ExecutionContext, Future}

class AddressHandler(addressDAO: AddressDAO)(implicit executionContext: ExecutionContext) {

  def addAddress(addressDTO: AddressDTO,
                 userId: Int): Future[AddressResponseDTO] = {
    addressDAO.insert(addressDTO.getAddress(userId)).map(_.getAddressResponseDTO)
  }

  def getAddresses(userId: Int): Future[Seq[AddressResponseDTO]] = {
    for {
      addresses <- addressDAO.search(userId)
    } yield addresses.map(_.getAddressResponseDTO)
  }

}
