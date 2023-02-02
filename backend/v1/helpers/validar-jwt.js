const jwt = require("jsonwebtoken")

async function validarJWT(req, res, next){
    // Verificar token en header correcto.
    const token = req.header(process.env.TOKENHEADER)
    // console.log(token)

    // Si no existe el token.
    if(!token){
        return res.status(400).json({
            msg: `ERROR: No se ha mandado ningun token en la peticion.`
        })
    }

    try {
        // Se verifica el token y extraen datos.
        let decoded = JSON.parse(JSON.stringify(jwt.verify(token, process.env.SECRETORPRIVATEKEY)))

        // Se guardan los datos en el req.
        req.udi = decoded.uid
        // console.log(`req.udi:${req.udi} | decoded.uid:${decoded.uid}`)

        next()
    }catch(error) {
        console.log(error)
        return res.status(400).json({
            msg: `ERROR: Token Invalido.`
        })
    }
}

module.exports = {
    validarJWT
}