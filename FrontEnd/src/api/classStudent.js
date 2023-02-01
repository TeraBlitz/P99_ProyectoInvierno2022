import { postData, getData, deleteData } from '../utils/requestUtils'

export const createClassStudent = (body) => {
    return postData('/v1/alumnoClases/create', body)
}

export const getClassStudent = () => {
    return getData(`/v1/alumnoClases`)
}

export const deleteClassStudent = (id) => {
    return deleteData('/v1/alumnoClases/delete', id)
}
