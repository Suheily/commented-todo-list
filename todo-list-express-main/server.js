const express = require('express') // tells the server to require the express module and assigns it a variable
const app = express() // tells the server to require express function and assigns it to the variable app
const MongoClient = require('mongodb').MongoClient // tells the server to require the Mongodb Client and assigns it to the variable MongoClient
const PORT = 2121 // declares the server port as 2121
require('dotenv').config() // requires the .env module


let db, // creates variable db
    dbConnectionStr = process.env.DB_STRING, // creates variable dbConnectionStr and assigns it to the value of DB_STRING in the .env file
    dbName = 'todo' // creates variable dbName and sets it to the string of todo

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // starts connection to Mongo Client and connects to the data at dbConnectionStr
    .then(client => { // if connection is successful, returns the promise of client and executes the next code
        console.log(`Connected to ${dbName} Database`) // prints dbName to the console
        db = client.db(dbName) // assigns dbName of client to variable db
    } )// ends the promise
    
app.set('view engine', 'ejs') // instructs the server to set the view engine to ejs to be rendered on the page
app.use(express.static('public')) // tells express to pull static files from public folder
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json from the content-type


app.get('/',async (request, response)=>{ // set the HTTP method to get and tells the server what to do when get requests
    const todoItems = await db.collection('todos').find().toArray() // declares variable todoItems that awaits the results found in the database collection called todos and displays it as an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})// declares a variable that awaits the results of the total counted documents that are not completed in the 'todos' collection
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) // tells server to render key:value pairs in index.ejs at the route of '/'
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error)) 
}) // ends asynchronous function block

app.post('/addTodo', (request, response) => { // opens /addTodo block and delivers response to request
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) // inserts one new thing to 'todos' db.collection with completed value of false
    .then(result => { // returns result as promise
        console.log('Todo Added') // prints 'Todo Added' to the console
        response.redirect('/') // redirects response back to root directory at '/'
    }) // ends result promise block
    .catch(error => console.error(error)) // catches and throws error, then prints it
}) // ends /addTodo block

app.put('/markComplete', (request, response) => { // opens /markComplete block and delivers response to request
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // updates one existing thing in 'todos' db.collection 
        $set: { // call $set operator to replace the value of the specified field
            completed: true // replaces the completed value of false to true
          } // ends $set call block
    },{// starts second parameter for updateOne method
        sort: {_id: -1}, // sorts all input documents by their id in descending order
        upsert: false // tells server to not create new document if none of the documents satisfy the criteria of completed: true
    })
    .then(result => { // returns result as a promise
        console.log('Marked Complete') // prints 'Marked Complete' to the console
        response.json('Marked Complete') // sends JSON 'Marked Complete' response 
    }) // ends result promise block
    .catch(error => console.error(error)) // catches and throws error, then prints it

}) // ends /markComplete block

app.put('/markUnComplete', (request, response) => { // opens /markUnComplete block and delivers response to request
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{// updates an existing thing and starts second parameter for updateOne method
        $set: { // call $set operator to replace the value of the specified field
            completed: false// replaces the completed value of true to false
          }// ends $set call block
    },{// starts third parameter for updateOne method
        sort: {_id: -1},// sorts all input documents by their id in descending order
        upsert: false // tells server to not create new document if none of the documents satisfy the criteria of completed: true
    })//ends the parameters for updateOne method
    .then(result => { // returns result as a promise
        console.log('Marked Complete') // prints 'Marked Complete' to the console
        response.json('Marked Complete') // sends JSON 'Marked Complete' response
    }) // ends result promise block
    .catch(error => console.error(error)) // catches and throws error, then prints it

}) // closes /markUnComplete block

app.delete('/deleteItem', (request, response) => { // opens /deleteItem block and delivers response to request
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) // deletes one existing thing from 'todos' db.collection
    .then(result => { // returns result as a promise
        console.log('Todo Deleted') // prints 'Todo Deleted' to the console
        response.json('Todo Deleted') // sends JSON 'Todo Deleted' response
    }) // ends result promise block
    .catch(error => console.error(error)) // catches and throws error, then prints it 

}) // closes /deleteItem block

app.listen(process.env.PORT || PORT, ()=>{// tells the server to connect to either a port specified in the .env or the port defined as PORT
    console.log(`Server running on port ${PORT}`)// console logs a message that says the server is running and the specified port number
})// ends the listen for the port