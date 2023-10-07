package com.hashini.services.rating.persistence

import com.hashini.services.rating.util.DefaultConfiguration
import org.flywaydb.core.Flyway
import org.flywaydb.core.api.output.MigrateResult

object MigrateDatabaseSchema {

  private val url = DefaultConfiguration.DB_URL
  private val user = DefaultConfiguration.DB_USER
  private val password = DefaultConfiguration.DB_PASSWORD

  private val flyway = Flyway.configure().dataSource(url, user, password).load()

  def migrate(): MigrateResult = {
    flyway.migrate()
  }
}