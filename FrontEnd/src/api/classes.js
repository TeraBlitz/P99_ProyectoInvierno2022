import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createClass = (student) => {
    return postData('/v1/clases/create/', student)
}

export const updateClass = (student) => {
    return putData('/v1/clases/update/', student)
}

export const getClasses = () => {
    return getData(`/v1/clases/`)
}

export const deleteClasses = (student) => {
    return deleteData(`/v1/clases/delete`, student)
}
