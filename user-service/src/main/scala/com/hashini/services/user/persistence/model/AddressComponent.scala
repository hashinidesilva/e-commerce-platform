package com.hashini.services.user.persistence.model

import com.hashini.services.user.persistence.model.savable.Address
import slick.lifted.ProvenShape

trait AddressComponent {
  this: ProfileComponent =>

  import profile.api._

  class AddressTable(tag: Tag) extends Table[Address](tag, _tableName = "addresses") {

    def id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)

    def userId: Rep[Int] = column[Int]("user_id")

    def address: Rep[String] = column[String]("address")

    def fullName: Rep[String] = column[String]("full_name")

    def province: Rep[String] = column[String]("province")

    def city: Rep[String] = column[String]("city")

    def phoneNumber: Rep[Int] = column[Int]("phone_number")

    def postalCode: Rep[Int] = column[Int]("postal_code")

    def isDefault: Rep[Boolean] = column[Boolean]("is_default")

    override def * : ProvenShape[Address] = (fullName,
      phoneNumber,
      address,
      province,
      city,
      postalCode,
      userId,
      isDefault,
      id) <> (Address.tupled, Address.unapply)
  }

  lazy val addressQuery = TableQuery[AddressTable]
}