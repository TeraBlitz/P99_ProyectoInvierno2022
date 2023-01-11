const connection = require('../connection')

const getUsers = (req, res)=>{
    // Ontener todos los datos
    db.collection('asistencias')
    .find()
    .toArray(function (err, items) {
        res.send(items)
    })
}

const createUser = (req, res)=>{
    // Solicitud para crear
    db.collection('asistencias').insertOne({ text: req.body.text }, function (
        err,
        info
    ) {
        res.json(info.ops[0])
    })
}

const updateUser = (req, res)=>{
    // Actualizar por su ID
    db.collection('asistencias').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.body.id) },
        { $set: { text: req.body.text } },
        function () {
            res.send('Actualizado con exito!')
        }
    )
}

const deleteUser = (req, res)=>{
    // Eliminar por su ID
    db.collection('asistencias').deleteOne(
        { _id: new mongodb.ObjectId(req.body.id) },
        function () {
        res.send('Eliminado con exito!')
        }
    )
}

module.exports = {getUsers, createUser, updateUser, deleteUser}