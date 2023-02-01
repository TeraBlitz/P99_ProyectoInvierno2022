import { postData, getData } from '../utils/requestUtils'

export const findTerm = (clave) => {
    return postData('/v1/periodos/find', clave)
}
