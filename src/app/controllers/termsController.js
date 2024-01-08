const express = require("express")
const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const terms = "Termos de serviço /n Constinuação dos termos..."
    return res.status(200).send({ message: terms })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "Error loading terms" })
  }
})

module.exports = (app) => app.use("/terms", router)
