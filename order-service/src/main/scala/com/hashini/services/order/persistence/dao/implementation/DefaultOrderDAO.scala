package com.hashini.services.order.persistence.dao.implementation

import com.hashini.services.order.persistence.DatabaseConnector.db
import com.hashini.services.order.persistence.dao.OrderDAO
import com.hashini.services.order.persistence.model.DAL._
import com.hashini.services.order.persistence.model.savable.Order

import scala.concurrent.Future

class DefaultOrderDAO extends OrderDAO {

  import profile.api._

  override def search(userId: Int): Future[Seq[Order]] = {
    db.run(orderQuery.filter(_.userId === userId).result)
  }

  override def getOrder(id: Int): Future[Option[Order]] = {
    db.run(orderQuery.filter(_.id === id).result.headOption)
  }

  override def insertOrder(order: Order): Future[Order] = {
    db.run((orderQuery returning orderQuery) += order)
  }
}