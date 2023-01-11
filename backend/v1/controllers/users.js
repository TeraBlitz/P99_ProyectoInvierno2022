/* const User = require('../models/users') */
const connection = require('../connection')

const getUsers = (req, res)=>{
    // Ontener todos los users
    db.collection('users')
    .find()
    .toArray(function (err, items) {
        res.send(items)
    })
}

const createUser = (req, res)=>{
    // Solicitud para crear
    db.collection('users').insertOne({ text: req.body.text }, function (
        err,
        info
    ) {
        res.json(info.ops[0])
    })
}

const updateUser = (req, res)=>{
    // Actualizar por su ID
    db.collection('users').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.body.id) },
        { $set: { text: req.body.text } },
        function () {
            res.send('Actualizado con exito!')
        }
    )
}

const deleteUser = (req, res)=>{
    // Eliminar por su ID
    db.collection('users').deleteOne(
        { _id: new mongodb.ObjectId(req.body.id) },
        function () {
        res.send('Eliminado con exito!')
        }
    )
}

module.exports = {getUsers, createUser, updateUser, deleteUser}