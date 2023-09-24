package com.hashini.services.user

import com.hashini.services.user.persistence.MigrateDatabaseSchema

object Main extends App {

  MigrateDatabaseSchema.migrate()
}