package com.hashini.services.user

import com.hashini.services.user.api.RestServer
import com.hashini.services.user.handler.AddressHandler
import com.hashini.services.user.persistence.MigrateDatabaseSchema
import com.hashini.services.user.persistence.dao.implementation.DefaultAddressDAO

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val addressDAO = new DefaultAddressDAO
  private val addressHandler = new AddressHandler(addressDAO)

  new RestServer(addressHandler).createServer()
  MigrateDatabaseSchema.migrate()
}