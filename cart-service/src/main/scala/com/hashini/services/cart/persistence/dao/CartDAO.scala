package com.hashini.services.cart.persistence.dao

import com.hashini.services.cart.persistence.model.savable.Cart
import scala.concurrent.Future

trait CartDAO {

  def getCart(userId: Int): Future[Option[Cart]]

}
