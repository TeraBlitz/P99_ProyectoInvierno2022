import { postData, getData } from '../utils/requestUtils'

export const findTerm = (clave) => {
    return postData('https://p99test.fly.dev.dev/v1/periodos/find', clave)
}
