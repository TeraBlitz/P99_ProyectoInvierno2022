const {validationResult} = require('express-validator')

async function validarCampos(req, res, next){
	
    const errors = validationResult(req)

    // En caso de que existan errores
    if(!errors.isEmpty()){
        return res.status(400).json({
            msg: 'Error al validar los campos.',
            errors: errors
        })
    }

    next()
}

module.exports = {
    validarCampos
}