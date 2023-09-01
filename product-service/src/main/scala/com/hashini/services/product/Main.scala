package com.hashini.services.product

import com.hashini.services.product.handler.ProductHandler
import com.hashini.services.product.persistence.MigrateDatabaseSchema
import com.hashini.services.product.restapi.RestServer

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val productService = new ProductHandler()

  new RestServer(productService).createServer()
  MigrateDatabaseSchema.migrate()
}