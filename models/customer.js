const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const Customer = mongoose.model('Customer', customerSchema)

//export customer to other pages
module.exports = Customer
