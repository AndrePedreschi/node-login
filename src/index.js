const express = require('express')
//import swaggerUi from 'swagger-ui-express'
const swaggerUi = require('swagger-ui-express')
//import swaggerDocs from '../src/config/swagger.json'
const swaggerDocs = require('../src/config/swagger.json')
  
  
const app = express()

app.use(express.json())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.urlencoded({ extended: true }))

require('./app/controllers/index')(app)


app.listen(3000, () => {
  console.log("Conectado a porta 3000");
})