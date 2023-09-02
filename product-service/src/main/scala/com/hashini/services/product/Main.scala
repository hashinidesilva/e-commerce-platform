package com.hashini.services.product

import com.hashini.services.product.api.RestServer
import com.hashini.services.product.handler.ProductHandler
import com.hashini.services.product.persistence.MigrateDatabaseSchema
import com.hashini.services.product.persistence.dao.implementation.{DefaultCategoryDAO, DefaultProductDAO}

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val productDAO = new DefaultProductDAO
  private val categoryDAO = new DefaultCategoryDAO

  private val productService = new ProductHandler(productDAO)

  new RestServer(productService).createServer()
  MigrateDatabaseSchema.migrate()
}