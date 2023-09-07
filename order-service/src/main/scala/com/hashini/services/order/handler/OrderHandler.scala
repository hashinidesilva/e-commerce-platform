package com.hashini.services.order.handler

import com.hashini.services.order.dto.OrderDTO

import scala.concurrent.{ExecutionContext, Future}

class OrderHandler(implicit executionContext: ExecutionContext) {

  def getOrders() = {
    Future(Seq())
  }

  def addOrder(order: OrderDTO) = {
    Future(order)
  }

}
