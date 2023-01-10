const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajv = new Ajv({allErrors: true}) // Ajv option allErrors is required
const localize_es = require('ajv-i18n/localize/es')
addFormats(ajv)
require("ajv-errors")(ajv)

const schema = {
type: "object",
properties: {
	id: {type: "integer"},
    nombre_curso: {type: "string"},
    nivel: {type: "integer"},
    idMaestro: {type: "integer"},
    frecuencia_semanal: {type: "string"},
    cupo_maximo: {type: "integer"}
},
required: [
	"id","nombre_curso","nivel","idMaestro","frecuencia_semanal","cupo_maximo"
],
additionalProperties: false,
errorMessage: {
    type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
  },
}

const validate = ajv.compile(schema)

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