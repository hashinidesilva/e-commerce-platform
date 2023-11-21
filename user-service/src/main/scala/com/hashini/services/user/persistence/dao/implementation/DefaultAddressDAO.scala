package com.hashini.services.user.persistence.dao.implementation

import com.hashini.services.user.persistence.DatabaseConnector.db
import com.hashini.services.user.persistence.dao.AddressDAO
import com.hashini.services.user.persistence.model.DAL.{addressQuery, profile}
import com.hashini.services.user.persistence.model.savable.Address

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class DefaultAddressDAO extends AddressDAO {

  import profile.api._

  override def insertOrUpdate(address: Address): Future[Address] = {
    db.run(insertOrUpdateIO(address))
  }

  override def insertOrUpdateIO(address: Address): DBIOAction[Address, NoStream, Effect.Write] = {
    for {
      addressOption <- (addressQuery returning addressQuery).insertOrUpdate(address)
    } yield addressOption.getOrElse(address)
  }

  override def search(userId: Int): Future[Seq[Address]] = {
    db.run(addressQuery.filter(_.userId === userId).result)
  }

  override def markAsNonDefault(userId: Int,
                                defaultAddressId: Int): DBIOAction[Int, NoStream, Effect.Write] = {
    addressQuery.filter(_.userId === userId).filterNot(_.id === defaultAddressId).map(_.isDefault).update(false)
  }

  override def delete(id: Int): Future[Int] = {
    db.run(addressQuery.filter(_.id === id).delete)
  }
}