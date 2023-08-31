package com.hashini.productservice

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import com.hashini.productservice.routes.ProductRoute
import com.hashini.productservice.service.ProductService

import scala.concurrent.ExecutionContext

object Main extends App {
  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "product")
  implicit val executionContext: ExecutionContext = system.executionContext

  val productService = new ProductService()
  private val routes = new ProductRoute(productService).route

  val server = Http().newServerAt("localhost", 9090).bind(routes)
}