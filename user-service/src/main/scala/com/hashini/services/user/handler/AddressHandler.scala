package com.hashini.services.user.handler

import com.hashini.services.user.dto.{AddressDTO, AddressResponseDTO}
import com.hashini.services.user.persistence.DatabaseConnector.db
import com.hashini.services.user.persistence.dao.AddressDAO
import com.hashini.services.user.persistence.model.savable.Address

import scala.concurrent.{ExecutionContext, Future}

class AddressHandler(addressDAO: AddressDAO)(implicit executionContext: ExecutionContext) {

  def addAddress(newAddress: AddressDTO,
                 userId: Int): Future[AddressResponseDTO] = {
    val address = newAddress.getAddress(userId)
    if (address.isDefault) {
      insertOrUpdateAndMarkOthersAsNonDefault(address)
    } else {
      addressDAO.insertOrUpdate(address).map(_.getAddressResponseDTO)
    }
  }

  def getAddresses(userId: Int): Future[Seq[AddressResponseDTO]] = {
    for {
      addresses <- addressDAO.search(userId)
    } yield addresses.map(_.getAddressResponseDTO)
  }

  def updateAddress(updatedAddress: AddressDTO,
                    userId: Int,
                    addressId: Int): Future[AddressResponseDTO] = {
    val address = updatedAddress.getAddress(userId).copy(id = addressId)
    if (address.isDefault) {
      insertOrUpdateAndMarkOthersAsNonDefault(address)
    } else {
      addressDAO.insertOrUpdate(address).map(_.getAddressResponseDTO)
    }
  }

  private def insertOrUpdateAndMarkOthersAsNonDefault(address: Address): Future[AddressResponseDTO] = {
    val query = for {
      newAddress <- addressDAO.insertOrUpdateIO(address)
      _ <- addressDAO.markAsNonDefault(newAddress.userId, newAddress.id)
    } yield newAddress.getAddressResponseDTO
    db.run(query)
  }

}