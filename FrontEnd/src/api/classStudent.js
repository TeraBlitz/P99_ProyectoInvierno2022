import { postData, getData } from '../utils/requestUtils'

export const createClassStudent = (body) => {
    return postData('http://127.0.0.1:3000/v1/alumnoClases/create', body)
}

export const getClassStudent = () => {
    return getData(`http://127.0.0.1:3000/v1/alumnoClases`)
}
