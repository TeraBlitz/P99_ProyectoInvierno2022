const { clientConnect } = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb")

async function validarRolAdmin(req, res, next){
    const database = clientConnect.db(mongodbInf.database);
    const collection = database.collection("users");

    try {
        // Obtener datos del usuario.
        const query = {_id: new mongodb.ObjectId(req.udi)}
        const result = await collection.find(query).toArray();
        usuario = result[0]

        // Validar rol del usuario.
        if(usuario.rol !== 'admin'){
            return res.status(400).json({
                msg: `ERROR: El usuario no es administrador.`
            })
        }

        next()
    }catch(error) {
        console.log(error)
        return res.status(400).json({
            msg: `ERROR: validarRolAdmin.`
        })
    }
}

module.exports = {
    validarRolAdmin,
}