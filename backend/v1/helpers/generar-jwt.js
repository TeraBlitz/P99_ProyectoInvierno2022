import jwt from 'jsonwebtoken'

// Generar los JWT.
async function generateJWT(uid = ''){

    return new Promise((resolve, reject) => {
        // Solo se carga el ID del user en el Payload.
        const payload = { uid: uid }
        // console.log(`generateJWT: ${uid}`)

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' // Tiempo de vida del Token.
        },
        (err, token) => {
            if(err){
                console.log(err)
                reject('ERROR: No se pudo generar el token.')
            }else{
                resolve(token)
            }
        })
    })
}

export {
    generateJWT
}