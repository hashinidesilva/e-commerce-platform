
import com.hashini.services.cart.api.RestServer
import com.hashini.services.cart.handler.CartHandler
import com.hashini.services.cart.persistence.MigrateDatabaseSchema
import com.hashini.services.cart.persistence.dao.implementation.{DefaultCartDAO, DefaultCartItemDAO}

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val cartDAO = new DefaultCartDAO()
  private val cartItemDAO = new DefaultCartItemDAO()
  private val cartHandler = new CartHandler(cartDAO, cartItemDAO)

  new RestServer(cartHandler).createServer()
  MigrateDatabaseSchema.migrate()

}