const mongoose = require("mongoose")

//mongoose.connect("mongodb://localhost:27017/noderest")
mongoose
  .connect(
    "mongodb+srv://dbsimple:CpnqglAxnudMIqmL@cluster0-robalo.kmh0vmb.mongodb.net/noderest?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB conectado")
  })
  .catch((err) => {
    console.log(err)
  })

//mongoose.Promise = global.Promise

module.exports = mongoose
