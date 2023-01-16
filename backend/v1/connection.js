const { MongoClient } = require("mongodb");
const { mongodbInf } = require('./config.js')

// Funcion principal de la conexion.
async function connection() {
    // Connection URI.
    // mongodb://localhost:27017
    const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`
    // Crear un nuevo MongoClient
    const client = new MongoClient(uri);

    try {
        // Conectar el cliente con el server (optional starting in v4.7).
        await client.connect();
        // Testeo
        await checkTest_db(client)
        // Establecer y verificar conexion.
        await client.db("test_db").command({ ping: 1 });
        console.log("Conectado con exito al servidor.");
    }catch(err){
        console.log(`ERROR: ${err}`)
    }/* finally {
        // Asegurar que el cliente se cerrará cuando termine/error.
        await client.close();
    } */
    return client
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

module.exports = {connection}