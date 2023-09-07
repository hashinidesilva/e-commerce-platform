package com.hashini.services.order

import com.hashini.services.order.api.RestServer
import com.hashini.services.order.handler.OrderHandler
import com.hashini.services.order.persistence.MigrateDatabaseSchema
import com.hashini.services.order.persistence.dao.implementation.DefaultOrderDAO

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val orderDAO = new DefaultOrderDAO
  private val orderHandler = new OrderHandler(orderDAO)

  new RestServer(orderHandler).createServer()
  MigrateDatabaseSchema.migrate()

}