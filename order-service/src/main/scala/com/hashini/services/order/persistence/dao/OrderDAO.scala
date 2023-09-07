package com.hashini.services.order.persistence.dao

import com.hashini.services.order.persistence.model.savable.Order

import scala.concurrent.Future

trait OrderDAO {

  def search(userId: Int): Future[Seq[Order]]

  def getOrder(id: Int): Future[Option[Order]]

  def insertOrder(order: Order): Future[Order]

}