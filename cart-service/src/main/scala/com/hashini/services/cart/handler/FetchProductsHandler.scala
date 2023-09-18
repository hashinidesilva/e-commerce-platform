package com.hashini.services.cart.handler

import com.hashini.services.cart.dto.{ProductResponseDTO, ProductsDTO}
import org.json4s.native.Serialization
import org.json4s.{DefaultFormats, Serialization}
import sttp.client3.akkahttp.AkkaHttpBackend
import sttp.client3.json4s.asJson
import sttp.client3.{UriContext, basicRequest}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class FetchProductsHandler(implicit execution_Context: ExecutionContext) {

  implicit val serialization: Serialization = Serialization
  implicit val formats: DefaultFormats = DefaultFormats
  private val backend = AkkaHttpBackend()

  def sendProductsRequest(): Future[ProductsDTO] = {
    val responseFuture = basicRequest.get(uri"http://localhost:9000/products").
      response(asJson[ProductsDTO]).send(backend)
    responseFuture.transform {
      case Success(response) if response.body.isRight =>
        Success(response.body.toOption.getOrElse(ProductsDTO(Seq())))
      case _ =>
        Failure(new Exception("Couldn't fetch products details"))
    }
  }

  def sendProductRequest(productId: Int): Future[ProductResponseDTO] = {
    val responseFuture = basicRequest.get(uri"http://localhost:9000/products/$productId").
      response(asJson[ProductResponseDTO]).send(backend)
    responseFuture.transform {
      case Success(response) if response.body.isRight =>
        Success(response.body.toOption.get)
      case _ =>
        Failure(new Exception(s"Couldn't fetch product details for [id: $productId]"))
    }
  }
}