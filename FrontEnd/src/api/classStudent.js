import { postData, getData, deleteData } from '../utils/requestUtils'

export const createClassStudent = (body) => {
    return postData('https://p99test.fly.dev/v1/alumnoClases/create', body)
}

export const getClassStudent = () => {
    return getData(`https://p99test.fly.dev/v1/alumnoClases`)
}

export const deleteClassStudent = (id) => {
    return deleteData('https://p99test.fly.dev/v1/alumnoClases/delete', id)
}
