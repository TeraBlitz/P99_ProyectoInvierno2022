import Ajv from "ajv"
import addFormats from "ajv-formats"
import ajvErrors from "ajv-errors"
import localize_es from 'ajv-i18n/localize/es/index.js'
import { alumnoSchema } from '../schemas/alumnoSchema.js'

const ajv = new Ajv({allErrors: true, strict:false}) // Ajv option allErrors is required
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(alumnoSchema)

async function validateAlumno(req, res, next){
	const isValid = validate(req.body)

	if(!isValid){
		localize_es(validate.errors)
		res.status(400).send(`ERROR: ${ajv.errorsText(validate.errors, {separator: '\n'})}`)
		// console.log(ajv.errorsText(validate.errors, {separator: '\n'}))
	}else{
		// console.log("La data es valida")
		next()
	}

}

export {
	validateAlumno
}