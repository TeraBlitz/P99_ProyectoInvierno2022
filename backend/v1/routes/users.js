import express from 'express'
import { getAllUser, createUser, updateUser, deleteUser, findUser } from '../controllers/users.js'
import { validateUser } from '../validators/validateUser.js'
import { correoNoExiste, userNameNoExiste } from '../helpers/dbValidators.js'
// import { validarJWT } from '../helpers/validar-jwt.js'
import { validarRolAdmin } from '../helpers/validarRolAdmin.js'
import { rolInsertarNoEsAdmin } from '../helpers/rolInsertarNoEsAdmin.js'
import { requiredScopes,claimCheck } from 'express-oauth2-jwt-bearer'
const router = express.Router()
router.get('/', [
    validarRolAdmin,
    // checkScopes,
    // claimCheck((claims)=>console.log('>>>',claims))
], getAllUser)
router.post('/create', [
    // validateUser, // Schema
    correoNoExiste,
    userNameNoExiste,
    rolInsertarNoEsAdmin,
], createUser)
router.post('/createAdmin', [
    validarRolAdmin,
    validateUser, // Schema
    correoNoExiste,
    userNameNoExiste,
], createUser)
router.put('/update/:id', [
    validateUser, // Schema
], updateUser)
router.delete('/delete/:id', [
    validarRolAdmin,
], deleteUser)
router.post('/find/:id', findUser)

export default router