const { MongoClient } = require("mongodb");
const { mongodbInf } = require('./config.js')

// Connection URI.
// mongodb://localhost:27017
const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`
// Crear un nuevo MongoClient
const clientCon = new MongoClient(uri);

// Funcion principal de la conexion.
async function connection() {
    try {
        // Conectar el cliente con el server (optional starting in v4.7).
        await clientCon.connect();
        // Testeo
        await checkTest_db(clientCon)
        // Establecer y verificar conexion.
        await clientCon.db("test_db").command({ ping: 1 });
        console.log("Conectado con exito al servidor.");
    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally {
        // Asegurar que el cliente se cerrará cuando termine/error.
        await clientCon.close();
    }
}

// Testeo de la conexion.
// connection().catch(console.error);

// Funcion de test que lista las bases de datos.
async function checkTest_db(client){
    const databasesList = await client.db().admin().listDatabases()

    databasesList.databases.forEach(db => {
        if(db.name == 'test_db'){
            console.log(`- DB: '${db.name}' detectada. `)
        }
    })
}

module.exports = {connection, clientCon}