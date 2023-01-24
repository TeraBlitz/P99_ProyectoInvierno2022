const jwt = require("jsonwebtoken")

async function validarJWT(req, res, next){

    const token = req.header('auth-token')

    console.log(token)

    next()
}

module.exports = {
    validarJWT
}