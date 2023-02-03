import { postData, getData } from '../utils/requestUtils'

export const findTerm = (clave) => {
    return postData('/v1/periodos/find', clave)
}

export const getPeriodos = () => {
    return getData(`/v1/periodos/`)
}