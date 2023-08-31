package com.hashini.productservice.routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model.StatusCodes.InternalServerError
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.hashini.productservice.converter.JsonConverter
import com.hashini.productservice.model
import com.hashini.productservice.service.ProductService
import com.hashini.productservice.model.{Product, Products}

import scala.util.{Failure, Success}

class ProductRoute(productService: ProductService) extends JsonConverter {

  val route: Route = pathPrefix("products") {
    concat(
      pathEnd {
        concat(
          get {
            onComplete(productService.getProducts) {
              case Success(products) =>
                complete(model.Products(products))
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
