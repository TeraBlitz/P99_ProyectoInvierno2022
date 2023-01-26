import { postData, getData } from '../utils/requestUtils'

export const findTerm = (clave) => {
    return postData('http://127.0.0.1:3000/v1/periodos/find', clave)
}
