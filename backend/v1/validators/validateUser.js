/* 
	Se usa ajv con:
		- ajv-formats
		- ajv-errors
		- ajv-i18n (idioma para errores)
*/
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
		curp: {type: "string"},
		tipo_usuario: {type: "string"},
		nombre: {type: "string"},
		apellido_paterno: {type: "string"},
		apellido_materno: {type: "string"},
		edad: {type: "integer"},
		tutor: {type: "string"},
		lada: {type: "string"},
		num_telefono: {type: "string", format: "int32"},
		estado: {type: "string"},
		ciudad: {type: "string"},
		colonia: {type: "string"},
		escolaridad: {type: "string"},
		ultima_escuela: {type: "string"},
		correo: {type: "string", format: "email"}
	},
	required: [
		"id","curp","tipo_usuario","nombre","apellido_paterno","apellido_materno","edad","tutor","lada",
		"num_telefono","estado","ciudad","colonia","escolaridad","ultima_escuela","correo"
	],
	additionalProperties: false,
	errorMessage: {
		type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
	},
}

const validate = ajv.compile(schema)

const data = {
	id: 1,
	curp: "CURP de Ejemplo",
	tipo_usuario: "Alumno",
	nombre: "Jorge",
	apellido_paterno: "Hernandez",
	apellido_materno: "Montero",
	edad: 23,
	tutor: "Don Tutor",
	lada: "228",
	num_telefono: "1645220",
	estado: "Veracruz",
	ciudad: "Xalapa",
	colonia: "Marco AM",
	escolaridad: "Universidad",
	ultima_escuela: "ITESM",
	correo: "jorgetato1999@gmail.com",
}

const valid = validate(data)
if(!valid){
	localize_es(validate.errors)
	console.log(ajv.errorsText(validate.errors, {separator: '\n'}))
}else{
	console.log("Es valido")
}

const validateUser = (req, res, next) => {
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

module.exports = validateUser