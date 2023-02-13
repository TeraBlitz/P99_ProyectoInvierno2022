async function rolInsertarNoEsAdmin(req, res, next){
    console.log(req.body)
    if(req.body.rol == 'admin'){
        return res.status(400).json({
            msg: `ERROR: No puedes crear un usuario tipo administrador.`
        })
    }else{
        next()
    }
}

export {
    rolInsertarNoEsAdmin,
}