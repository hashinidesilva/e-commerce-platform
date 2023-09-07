package com.hashini.services.order

import com.hashini.services.order.api.RestServer
import com.hashini.services.order.handler.OrderHandler
import com.hashini.services.order.persistence.MigrateDatabaseSchema

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val orderHandler = new OrderHandler()

  new RestServer(orderHandler).createServer()
  MigrateDatabaseSchema.migrate()

}