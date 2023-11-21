package com.hashini.services.user

import com.hashini.services.user.api.RestServer
import com.hashini.services.user.handler.{AddressHandler, UserHandler}
import com.hashini.services.user.persistence.MigrateDatabaseSchema
import com.hashini.services.user.persistence.dao.implementation.{DefaultAddressDAO, DefaultUserDAO}

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val addressDAO = new DefaultAddressDAO
  private val userDAO = new DefaultUserDAO
  private val addressHandler = new AddressHandler(addressDAO)
  private val userHandler = new UserHandler(userDAO)

  new RestServer(userHandler, addressHandler).createServer()
  MigrateDatabaseSchema.migrate()
}