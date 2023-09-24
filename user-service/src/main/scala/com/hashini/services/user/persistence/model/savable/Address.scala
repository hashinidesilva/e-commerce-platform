package com.hashini.services.user.persistence.model.savable

case class Address(fullName: String,
                   phoneNumber: Int,
                   address: String,
                   province: String,
                   city: String,
                   postalCode: Int,
                   userId: Int,
                   id: Int = 0)