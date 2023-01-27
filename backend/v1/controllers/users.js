const { clientConnect } = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb")
const bcryptjs = require('bcryptjs')
const COLLECTION_NAME = "users"

async function getAllUser(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllUser
// getAllUser().catch(console.dir);

async function findUser(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Detectar la key y crear la query
        let query = ""
        let key = ""
        let value = ""
        if(req.body.user_name){
            key = "Nombre de Usuario"
            value = req.body.user_name
            query = {user_name: value};
        }else if(req.body.correo){
            key = "Correo"
            value = req.body.correo
            query = {correo: value};
        }else{
            throw("Parametros invalidos.")
        }

        // Ejecucion de la query
        const result = await collection.find(query).toArray();

        if(result == ''){
            res.send(`Ningun user con ${key}:"${value}" encontrado.`);
        }else{
            delete result[0].password
            res.send(result[0]);
        }
        
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllUser
// getAllUser().catch(console.dir);

// Create
async function createUser(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Encriptar password
        // Nivel de encriptado, por defecto es 10.
        req.body.password = bcryptjs.hashSync(req.body.password, 12)

        // Crear un Doc
        const doc = [
            {
                user_name: req.body.user_name,
                correo: req.body.correo,
                password: req.body.password,
                status: req.body.status,
                rol: req.body.rol
            },
        ];

        const result = await collection.insertMany(doc);
        for (i = 0; i < result.insertedCount; i++)
        res.send(
            `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        );
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test createUser
// createUser().catch(console.dir);

// Update
async function updateUser(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
            $set: {
                user_name: req.body.user_name,
                correo: req.body.correo,
                password: req.body.password,
                status: req.body.status,
                rol: req.body.rol
            },
        };

        const result = await collection.findAndUpdate(idDoc, doc);
        res.send(
            `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateUser ERROR: ${err}`);
    }
}
// Test updateUser
// updateUser().catch(console.dir);

// Delete
async function deleteUser(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // ID documento a eliminar
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id),
        };

        const result = await collection.deleteMany(idDoc);
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {
            res.send(`Documento con _id: ${idDoc._id} eliminado con exito.`);
        } else {
            res.send("Ningun documento encontrado. 0 Documentos eliminados.");
        }
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}
// Test deleteUser
// deleteUser().catch(console.dir);

module.exports = {
    findUser,
    getAllUser, 
    createUser, 
    updateUser, 
    deleteUser 
};
