package com.hashini.services.cart.persistence

import org.flywaydb.core.Flyway
import org.flywaydb.core.api.output.MigrateResult
import util.DefaultConfiguration

object MigrateDatabaseSchema {

  private val url = DefaultConfiguration.DB_URL
  private val user = DefaultConfiguration.DB_USER
  private val password = DefaultConfiguration.DB_PASSWORD

  private val flyway = Flyway.configure().dataSource(url, user, password).load()

  def migrate(): MigrateResult = {
    flyway.migrate()
  }

}
