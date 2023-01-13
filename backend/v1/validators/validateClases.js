const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajv = new Ajv({allErrors: true}) // Ajv option allErrors is required
const localize_es = require('ajv-i18n/localize/es')
addFormats(ajv)
require("ajv-errors")(ajv)
const {clasesSchema} = require('../schemas/clasesSchema')

const validate = ajv.compile(clasesSchema)

const data = {
	id: 1,
	nombre_curso: "Ingles IV",
	nivel: 4,
	idMaestro: 10,
    frecuencia_semanal: "Lu-Mi-Vi",
    cupo_maximo: 10
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