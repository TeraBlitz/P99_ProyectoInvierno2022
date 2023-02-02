const jwt = require("jsonwebtoken")

async function validarJWT(req, res, next){

    const token = req.header('p99-auth-token')
    // console.log(token)

    // Si no existe el token.
    if(!token){
        return res.status(400).json({
            msg: `ERROR: No se ha mandado ningun token en la peticion.`
        })
    }

    try {
        // Se verifica el token y extraen datos.
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // Se guardan los datos en el req.
        req.udi = uid

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