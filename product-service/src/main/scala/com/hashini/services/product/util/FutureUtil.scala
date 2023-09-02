package com.hashini.services.product.util

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

object FutureUtil {

  def predicate[T](argumentTry: Try[T]): Future[T] = {
    argumentTry match {
      case Success(value) =>
        Future.successful(value)
      case Failure(exception) =>
        Future.failed(exception)
    }
  }

}