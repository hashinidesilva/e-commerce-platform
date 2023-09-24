package com.hashini.services.user.persistence.model

import com.hashini.services.user.persistence.model.savable.User
import slick.lifted.ProvenShape

import java.sql.Timestamp

trait UserComponent {
  this: ProfileComponent =>

  import profile.api._

  class UserTable(tag: Tag) extends Table[User](tag, _tableName = "users") {

    def id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)

    def password: Rep[String] = column[String]("password")

    def email: Rep[String] = column[String]("email")

    def name: Rep[String] = column[String]("name")

    def phoneNumber: Rep[Int] = column[Int]("phone_number")

    def createdTime: Rep[Timestamp] = column[Timestamp]("timestamp")

    override def * : ProvenShape[User] = (email,
      password,
      name,
      phoneNumber,
      createdTime,
      id) <> (User.tupled, User.unapply)
  }

  lazy val userQuery = TableQuery[UserTable]
}