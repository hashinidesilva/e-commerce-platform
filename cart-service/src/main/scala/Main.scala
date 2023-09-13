
import com.hashini.services.cart.api.RestServer
import com.hashini.services.cart.handler.CartHandler
import com.hashini.services.cart.persistence.MigrateDatabaseSchema
import com.hashini.services.cart.persistence.dao.implementation.DefaultCartDAO

import scala.concurrent.ExecutionContext.Implicits.global

object Main extends App {

  private val cartDAO = new DefaultCartDAO()
  private val cartHandler = new CartHandler(cartDAO)

  new RestServer().createServer(cartHandler)
  MigrateDatabaseSchema.migrate()

}