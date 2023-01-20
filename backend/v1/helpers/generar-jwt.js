const jwt = require('jsonwebtoken')

async function generateJWT(uid = ''){

    return new Promise((resolve, reject) => {

        const payload = {uid}

        jwt.sign(payload, 'P99-ON-WEB', {
            expiresIn: '2h'
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

module.exports = {
    generateJWT
}