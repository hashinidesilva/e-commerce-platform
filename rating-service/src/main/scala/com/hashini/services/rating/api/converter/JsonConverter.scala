package com.hashini.services.rating.api.converter

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.hashini.services.rating.dto.{RatingDTO, RatingResponseDTO, RatingsDTO}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonConverter extends DefaultJsonProtocol with SprayJsonSupport {

  implicit val ratingFormat: RootJsonFormat[RatingDTO] = jsonFormat4(RatingDTO)
  implicit val ratingResponseFormat: RootJsonFormat[RatingResponseDTO] = jsonFormat5(RatingResponseDTO)
  implicit val ratingsFormat: RootJsonFormat[RatingsDTO] = jsonFormat1(RatingsDTO)

}