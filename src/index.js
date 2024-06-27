const express = require('express')
//import swaggerUi from 'swagger-ui-express'
const swaggerUi = require('swagger-ui-express')
//import swaggerDocs from '../src/config/swagger.json'
const swaggerDocs = require('../src/config/swagger.json')
const cors = require("cors")  
  
const app = express()
app.use(cors())

app.use(express.json())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.urlencoded({ extended: true }))

require('./app/controllers/index')(app)


app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
  () => {
    console.log("HTTP SERVER RUNNING!")
  }
)
  /* .then(() => {
    console.log("HTTP SERVER RUNNING!")
  }) */