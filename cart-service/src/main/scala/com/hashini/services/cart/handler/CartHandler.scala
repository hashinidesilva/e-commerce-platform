package com.hashini.services.cart.handler

import com.hashini.services.cart.dto.CartDTO
import com.hashini.services.cart.persistence.dao.CartDAO

import scala.concurrent.{ExecutionContext, Future}

class CartHandler(cartDAO: CartDAO)(implicit executionContext: ExecutionContext) {

  def getCart(userId: Int): Future[Option[CartDTO]] = {
    for {
      cartOption <- cartDAO.getCart(userId)
    } yield cartOption.map(_.getCartDTO)
  }

}