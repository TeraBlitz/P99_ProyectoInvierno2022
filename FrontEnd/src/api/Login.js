import { login, postData } from './../utils/requestUtils'

export const Login = (user) => {
    return login(user)
}

export const Reload = () =>{
    return postData('/v1/auth/reload')

}


