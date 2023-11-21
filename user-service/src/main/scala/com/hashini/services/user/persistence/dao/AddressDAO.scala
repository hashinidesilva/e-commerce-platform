package com.hashini.services.user.persistence.dao

import com.hashini.services.user.persistence.model.DAL.profile
import com.hashini.services.user.persistence.model.savable.Address

import scala.concurrent.Future

trait AddressDAO {

  import profile.api._

  def insertOrUpdate(address: Address): Future[Address]

  def insertOrUpdateIO(address: Address): DBIOAction[Address, NoStream, Effect.Write]

  def search(userId: Int): Future[Seq[Address]]

  def markAsNonDefault(userId: Int,
                       defaultAddressId: Int): DBIOAction[Int, NoStream, Effect.Write]

  def delete(id: Int): Future[Int]

}