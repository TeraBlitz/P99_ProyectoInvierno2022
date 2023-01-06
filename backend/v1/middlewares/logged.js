const isLogged = (req, res, next) => {
    let logged = true
    if(logged){
        next()
    }else{
        res.send('No se puede acceder. Debe loggearse primero.')
    }
}

exports.isLogged = isLogged