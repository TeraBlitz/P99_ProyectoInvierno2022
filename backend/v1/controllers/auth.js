const { response } = require('express')
const { clientConnect } = require('../connection.js')
const { mongodbInf } = require('../config.js')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generar-jwt')
const COLLECTION_NAME = "users"

async function login(req, res = response) {

    const {correo, password} = req.body

    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Verificar si existe el correo.
        query = {correo: correo};
        const result = await collection.find(query).toArray();
        usuario = result[0]

        usuario = result[0]

        if(result == ''){
            return res.status(400).json({
                msg: "Usuario incorrecto."
            })
        }

        // Verificar si el usuario esta activo.

        if(usuario.status !== '10'){
            return res.status(400).json({
                msg: "Usuario y/o password incorrectos. Usuario deshabilitado."
            })
        }

        // Verificar el password.


        const validPassword = bcryptjs.compareSync(password, usuario.password)
        delete usuario.password // Importante eliminar el password correcto.


        if(!validPassword){
            return res.status(400).json({
                msg: "Password incorrecto.",
            })
        }

        // Generar JWT.
        const token = await generateJWT(usuario.id)


        res.json({
            msg: 'Login OK',
            data_user: usuario,
            token: token
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hablo con el administrador.'
        })
    }
}

module.exports = {
    login
};
