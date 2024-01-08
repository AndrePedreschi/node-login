const mongoose = require("mongoose")
require("dotenv").config()
//mongoose.connect("mongodb://localhost:27017/noderest")
mongoose
  .connect(process.env.URI_DB)
  .then(() => {
    console.log("MongoDB conectado")
  })
  .catch((err) => {
    console.log(err)
  })

//mongoose.Promise = global.Promise

module.exports = mongoose
