async function validarRolAdmin(req, res, next){
    
    const { rol } = req.body
    console.log(rol)

    try {
        if(rol == "admin"){
            next()
        }else{
            return res.status(400).json({
                msg: 'Error: El Rol no es "admin".',
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

module.exports = {
    validarRolAdmin,
}