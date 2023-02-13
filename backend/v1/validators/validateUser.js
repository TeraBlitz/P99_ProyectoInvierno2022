import Ajv from "ajv"
import ajvErrors from "ajv-errors"
import addFormats from "ajv-formats"
import localize_es from 'ajv-i18n/localize/es/index.js'
import { userSchema } from '../schemas/userSchema.js'

const ajv = new Ajv({allErrors: true, strict:false}) // Ajv option allErrors is required
addFormats(ajv)
ajvErrors(ajv)
// require("ajv-errors")(ajv)
// Schema

const validate = ajv.compile(userSchema)

async function validateUser(req, res, next){
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
	validateUser
}