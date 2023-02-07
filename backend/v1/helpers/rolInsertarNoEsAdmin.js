async function rolInsertarNoEsAdmin(req, res, next){
    if(req.body.rol == 'admin'){
        return res.status(400).json({
            msg: `ERROR: No puedes crear un usuario tipo administrador.`
        })
    }else{
        next()
    }
}

module.exports = {
    rolInsertarNoEsAdmin,
}