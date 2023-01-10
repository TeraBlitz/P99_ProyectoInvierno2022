const User = require('../models/users')

const getUsers = (req, res)=>{
    User.find({}, (err, result)=>{
        if(err){
            console.log(`ERROR: ${err}`)
        }else{
            console.log('Usuarios consultados')
        }
    })
}

const createUser = (req, res)=>{
    const data = req.body
    const user = new User({
        name: data.name,
        age: data.age
    })
    user.save((err, result)=>{
        if(err){
            console.log(`ERROR: ${err}`)
        }else{
            console.log('Usuario Registrado')
        }
    })
}

const updateUser = (req, res)=>{
    res.send('Actualizar usuario')
}

const deleteUser = (req, res)=>{
    res.send('Eliminar usuario')
}

module.exports = {getUsers, createUser, updateUser, deleteUser}