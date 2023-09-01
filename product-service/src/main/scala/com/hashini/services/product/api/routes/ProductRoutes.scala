package com.hashini.services.product.api.routes

import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.services.product.model.{Product, Products}
import com.hashini.services.product.api.converter.JsonConverter
import com.hashini.services.product.handler.ProductHandler

import scala.util.{Failure, Success}

object ProductRoutes extends JsonConverter {

  def route(productService: ProductHandler): Route = {
    pathPrefix("products") {
      concat(
        pathEnd {
          concat(
            get {
              onComplete(productService.getProducts) {
                case Success(products) =>
                  complete(Products(products))
                case Failure(ex) =>
                  complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            },
            post {
              entity(as[Product]) { product =>
                onComplete(productService.addProduct(product)) {
                  case Success(product) =>
                    complete(product)
                  case Failure(ex) =>
                    complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
                }
              }
            }
          )
        },
        path(IntNumber) { id =>
          get {
            onComplete(productService.getProduct(id)) {
              case Success(product) =>
                complete(product)
              case Failure(ex) =>
                complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      )
    }
  }
}