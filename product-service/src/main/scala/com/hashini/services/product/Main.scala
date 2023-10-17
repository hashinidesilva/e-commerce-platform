package com.hashini.services.product

import com.hashini.services.product.api.RestServer
import com.hashini.services.product.handler.{CategoryHandler, ProductHandler}
import com.hashini.services.product.persistence.MigrateDatabaseSchema
import com.hashini.services.product.persistence.dao.implementation.{DefaultCategoryDAO, DefaultProductDAO}
import com.hashini.services.product.rabbitmq.ProductServer

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val productDAO = new DefaultProductDAO
  private val categoryDAO = new DefaultCategoryDAO

  private val productHandler = new ProductHandler(productDAO)
  private val categoryHandler = new CategoryHandler(categoryDAO)

  private val productServer = new ProductServer("product", productHandler)

  productServer.start
  new RestServer(productHandler, categoryHandler).createServer()
  MigrateDatabaseSchema.migrate()
}