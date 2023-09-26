package com.hashini.services.user.persistence.dao.implementation

import com.hashini.services.user.persistence.DatabaseConnector.db
import com.hashini.services.user.persistence.dao.AddressDAO
import com.hashini.services.user.persistence.model.DAL.{addressQuery, profile}
import com.hashini.services.user.persistence.model.savable.Address

import scala.concurrent.Future

class DefaultAddressDAO extends AddressDAO {

  import profile.api._

  override def insert(address: Address): Future[Address] = {
    db.run((addressQuery returning addressQuery) += address)
  }

  override def search(userId: Int): Future[Seq[Address]] = {
    db.run(addressQuery.filter(_.userId === userId).result)
  }
}