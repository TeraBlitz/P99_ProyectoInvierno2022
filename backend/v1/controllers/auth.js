const { response } = require('express')
const { clientConnect } = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb")
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generar-jwt')
const COLLECTION_NAME = "users"

async function login(req, res = response) {

    const {correo, user_name,  password} = req.body

    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Revisar si mando correo o username y preparar query
        let query
        if(correo){
            query = {correo: correo};
        }else if(user_name){
            query = {user_name: user_name};
        }else{
            return res.status(400).json({
                msg: 'Parametros de la request invalidos.'
            })
        }


        // Verificar si existe el c.
        const result = await collection.find(query).toArray();
        usuario = result[0]

        if(result == ''){
            return res.status(400).json({
                msg: "Usuario o correo incorrecto."
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
        const token = await generateJWT(usuario._id)

        res.json({
            msg: 'Login OK',
            data_user: {
                uid: usuario._id,
                user_name: usuario.user_name,
                correo: usuario.correo,
                rol: usuario.rol,
            },
            token: token
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function reload(req, res = response) {
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Obtener datos del usuario.
        const query = {_id: new mongodb.ObjectId(req.udi)}
        const result = await collection.find(query).toArray();
        usuario = result[0]

        // Generar JWT.
        const token = await generateJWT(usuario._id)

        res.json({
            msg: 'Reload OK',
            data_user: {
                uid: usuario._id,
                user_name: usuario.user_name,
                correo: usuario.correo,
                rol: usuario.rol,
            },
            token: token
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

module.exports = {
    login,
    reload
};
