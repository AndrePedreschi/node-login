const jwt = require("jsonwebtoken")
const authConfig = require("../../config/auth")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) res.status(401).send({ error: "No token provided" })

  const parts = authHeader.split(" ")

  if (!parts.lenght === 2) res.status(401).send({ error: "Token error" })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    res.status(401).send({ error: "Token malformatted" })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      res.status(401).send({ error: "Unauthorized action, token invalid" })

    req.userId = decoded.id
    return next()
  })
}
