const { MongoClient } = require("mongodb");
const { mongodb } = require('./config')


// Connection URI
const uri = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`

// Crear un nuevo MongoClient
const client = new MongoClient(uri);

const connection = async () => {
    try {
        // Conectar el cliente con el server (optional starting in v4.7)
        await client.connect();
        // Establecer y verificar conexion
        await client.db("admin").command({ ping: 1 });
        console.log("Conectado con exito al servidor");
    } finally {
        // Asegurar que el cliente se cerrará cuando termine/error
        await client.close();
    }
}   
run().catch(console.dir);

module.exports = connection

/* OLD VERSION MONGOOSE

const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
.then((db)=>{
    console.log('Conexion exitosa')
}).catch((err)=>{
    console.log(`ERROR: ${err}`)
})

*/