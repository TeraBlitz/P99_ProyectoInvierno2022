const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajv = new Ajv({allErrors: true}) // Ajv option allErrors is required
const localize_es = require('ajv-i18n/localize/es')
addFormats(ajv)
require("ajv-errors")(ajv)
// Schema
const {userSchema} = require('../schemas/userSchema')

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

module.exports = {validateUser}