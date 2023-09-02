package com.hashini.services.product.util

import java.util.concurrent.Executors
import scala.concurrent.{ExecutionContext, ExecutionContextExecutorService}

object PrivateExecutionContext {
  private val executor = Executors.newFixedThreadPool(4)
  implicit val executionContext: ExecutionContextExecutorService = ExecutionContext.fromExecutorService(executor)
}