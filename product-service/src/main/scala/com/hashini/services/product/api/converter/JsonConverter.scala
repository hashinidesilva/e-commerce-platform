package com.hashini.services.product.api.converter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.product.model.{Product, Products}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val productFormat: RootJsonFormat[Product] = jsonFormat5(Product)
  implicit val productsFormat: RootJsonFormat[Products] = jsonFormat1(Products)
}
