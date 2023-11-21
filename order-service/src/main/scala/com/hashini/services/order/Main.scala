package com.hashini.services.order

import com.hashini.services.order.api.RestServer
import com.hashini.services.order.handler.OrderHandler
import com.hashini.services.order.persistence.MigrateDatabaseSchema
import com.hashini.services.order.persistence.dao.implementation.DefaultOrderDAO
import com.hashini.services.order.rabbitmq.ProductClient

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val orderDAO = new DefaultOrderDAO
  private val productClient = new ProductClient("product")
  private val orderHandler = new OrderHandler(orderDAO, productClient)

  new RestServer(orderHandler).createServer()
  MigrateDatabaseSchema.migrate()

}