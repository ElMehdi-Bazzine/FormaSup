const express = require('express')
const app = express()
const connectDB = require('./db/mongo')
const path = require('path')
const cors = require('cors')

//Connect DB
connectDB()

//Init Middleware
app.use(cors())
app.use(express.json({limit: '50mb',extended:true}))

// PORT
const PORT = process.env.PORT || 4000

// App listening to the port
app.listen(PORT, () => console.log('Server started on port : ${PORT}'))
