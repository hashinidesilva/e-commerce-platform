package com.hashini.services.user.persistence.dao

import com.hashini.services.user.persistence.model.savable.Address

import scala.concurrent.Future

trait AddressDAO {

  def insert(address: Address): Future[Address]

  def search(userId: Int): Future[Seq[Address]]

}