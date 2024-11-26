//to make sure the user can make inputs
const prompt = require('prompt-sync')()

// const username = prompt('What is your name? ')

// console.log(`Your name is ${username}`)

//require for dotenv
require('dotenv').config()

//require for mongoose
const mongoose = require('mongoose')

//connect to Customer.js
const Customer = require('./models/customer')

//connect to the database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Welcome to the CRM')
    await menu()
  } catch (error) {
    console.log(error)
  }
}

const menu = async () => {
  while (true) {
    //possiple choises
    console.log('')
    console.log('What would you like to do?')
    console.log('')
    console.log('  1. Create a customer') //done
    console.log('  2. View all customers') //done
    console.log('  3. Update a customer') // done
    console.log('  4. Delete a customer') //done
    console.log('  5. quit')
    console.log('')
    //have the value of user input
    const number = prompt('Number of action to run: ')

    if (number === '1') {
      await createCustomer()
    } else if (number === '2') {
      await viewCustomers()
    } else if (number === '3') {
      await updateCustomer()
    } else if (number === '4') {
      await deleteCustomer()
    } else if (number === '5') {
      console.log('exiting...')
      mongoose.connection.close()
      break
    } else {
      console.log('Error, Enter a number between 1 and 5.')
    }
  }
}

const createCustomer = async () => {
  const customerName = prompt('What is the customers name?')
  const customerAge = prompt('What is the customers age?')
  const customerData = {
    name: customerName,
    age: customerAge
  }
  const customer = await Customer.create(customerData)
  console.log('New Customer', customer)
}

const viewCustomers = async () => {
  const customers = await Customer.find()
  //if no data
  if (customers.length === 0) {
    console.log('No customers found.')
  }
  console.log('Below is a list of customers:')
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
}

const updateCustomer = async () => {
  //display all customers :D
  await viewCustomers()
  console.log('')

  const customerID = prompt(
    'Copy and paste the id of the customer you would like to update here: '
  )
  const newName = prompt('What is the customers new name?')
  const newAge = prompt('What is the customers new age?')

  const updatedData = { name: newName, age: newAge }
  const result = await Customer.updateOne(
    { _id: customerID },
    { $set: updatedData }
  )

  await viewCustomers()
}

const deleteCustomer = async () => {
  //display all customers :D
  await viewCustomers()
  console.log('')

  const customerID = prompt(
    'Copy and paste the id of the customer you would like to delete here: '
  )
  const result = await Customer.deleteOne({ _id: customerID })

  await viewCustomers()
}

connect()
