package com.hashini.services.product.persistence.dao.implementation

import com.hashini.services.product.persistence.DatabaseConnector.db
import com.hashini.services.product.persistence.dao.ProductDAO
import com.hashini.services.product.persistence.model.DAL._
import com.hashini.services.product.persistence.model.savable.ProductItem
import com.hashini.services.product.util.PrivateExecutionContext.executionContext

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

class DefaultProductDAO extends ProductDAO {

  import profile.api._

  override def addProduct(product: ProductItem): Future[ProductItem] = {
    db.run((productQuery returning productQuery) += product)
  }

  override def search(name: Option[String],
                      category: Option[String]): Future[Seq[ProductItem]] = {
    val searchName = name.getOrElse("").trim.toLowerCase
    db.run((productQuery.filterIf(name.nonEmpty)(_.name.toLowerCase like s"%$searchName%") join
      categoryQuery on (_.categoryId === _.id)).
      filterOpt(category)(_._2.name.toLowerCase === _.toLowerCase).
      map(_._1).result)
  }

  override def load(id: Int): Future[Try[ProductItem]] = {
    for {
      productOption <- db.run(productQuery.filter(_.id === id).result.headOption)
    } yield productOption match {
      case Some(product) =>
        Success(product)
      case None =>
        Failure(new Exception(s"Product item is not found for id: $id"))
    }
  }

  override def updateAverageRating(id: Int,
                                   rating: Double): Future[Int] = {
    db.run(productQuery.filter(_.id === id).map(_.averageRating).update(rating))
  }

  override def updateQuantity(id: Int,
                              reducedQuantity: Int): Future[Unit] = {
    val query = for {
      productOption <- productQuery.filter(_.id === id).result.headOption
      _ <- productOption match {
        case Some(product) =>
          val remainingQuantity = product.quantity - reducedQuantity
          if (remainingQuantity >= 0) {
            productQuery.filter(_.id === id).map(_.quantity).update(remainingQuantity)
          } else {
            productQuery.filter(_.id === id).map(_.quantity).update(0)
          }
        case None =>
          DBIO.successful()
      }
    } yield ()

    db.run(query.transactionally)
  }
}