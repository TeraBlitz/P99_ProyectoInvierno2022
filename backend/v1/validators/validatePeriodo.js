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
		clave: {type: "string"},
		status: {type: "integer"},
		fecha_inicio: {type: "string", format: "date"},
		fecha_fin: {type: "string", format: "date"},
		fecha_inicio_insc: {type: "string", format: "date"},
		fecha_fin_insc: {type: "string", format: "date"},
		cursos_max_por_alumno: {type: "integer"},
		idiomas_max_por_alumno: {type: "integer"}
	},
	required: [
		"id","clave","status","fecha_inicio","fecha_fin","fecha_inicio_insc","fecha_fin_insc",
		"cursos_max_por_alumno","idiomas_max_por_alumno"
	],
	additionalProperties: false,
	errorMessage: {
		type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
	},
}

const validate = ajv.compile(schema)

const data = {
	id: 1,
	clave: "Ago-Dic-2016",
	status: 2,
	fecha_inicio: "2016-08-10",
	fecha_fin: "2016-12-26",
	fecha_inicio_insc: "2016-08-01",
	fecha_fin_insc: "2016-08-10",
    cursos_max_por_alumno: 3,
	idiomas_max_por_alumno: 1
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