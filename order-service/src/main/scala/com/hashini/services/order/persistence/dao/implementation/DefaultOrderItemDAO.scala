package com.hashini.services.order.persistence.dao.implementation

import com.hashini.services.order.persistence.DatabaseConnector.db
import com.hashini.services.order.persistence.dao.OrderItemDAO
import com.hashini.services.order.persistence.model.DAL._
import com.hashini.services.order.persistence.model.savable.OrderItem

import scala.concurrent.Future

class DefaultOrderItemDAO extends OrderItemDAO {

  import profile.api._

  override def insertOrderItems(orderItems: Seq[OrderItem]): Future[Seq[OrderItem]] = {
    db.run((orderItemQuery returning orderItemQuery) ++= orderItems)
  }
}