package com.hashini.productservice.converter

import com.hashini.productservice.model.{Product, Products}
import spray.json.DefaultJsonProtocol._
import spray.json.RootJsonFormat

trait JsonConverter {
  implicit val productFormat: RootJsonFormat[Product] = jsonFormat5(Product)
  implicit val productsFormat: RootJsonFormat[Products] = jsonFormat1(Products)
}
