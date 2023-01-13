const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajv = new Ajv({allErrors: true}) // Ajv option allErrors is required
const localize_es = require('ajv-i18n/localize/es')
addFormats(ajv)
require("ajv-errors")(ajv)
const {asistenciaSchema} = require('../schemas/asistenciaSchema')

const validate = ajv.compile(asistenciaSchema)

const data = {
	id: 1,
	idUsuario: 3,
	idClse: 5,
	fecha: "2016-08-10",
    asistio: 1,
}

const valid = validate(data)
if(!valid){
	localize_es(validate.errors)
	console.log(ajv.errorsText(validate.errors, {separator: '\n'}))
}else{
	console.log("Es valido")
}

const validatePeriodo = (req, res, next) => {
	const isValid = validate(req.body)

	if(!isValid){
		res.status(400).send("Hay un problema con el body")
		localize_es(validate.errors)
		console.log(ajv.errorsText(validate.errors, {separator: '\n'}))
	}else{
		console.log("La data es valida")
	}
	
	next()
}

module.exports = validatePeriodo