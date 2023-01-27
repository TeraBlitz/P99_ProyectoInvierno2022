import { postData, getData } from '../utils/requestUtils'

export const createClassStudent = (body) => {
    return postData('https://p99test.fly.dev.dev/v1/alumnoClases/create', body)
}

export const getClassStudent = () => {
    return getData(`https://p99test.fly.dev.dev/v1/alumnoClases`)
}
