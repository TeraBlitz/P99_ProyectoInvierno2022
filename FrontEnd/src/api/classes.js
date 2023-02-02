import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createClass = (student) => {
    return postData('http://127.0.0.1:8080/v1/clases/create/', student)
}

export const updateClass = (student) => {
    return putData('http://127.0.0.1:8080/v1/clases/update/', student)
}

export const getClasses = () => {
    return getData(`http://127.0.0.1:8080/v1/clases/`)
}

export const deleteClasses = (student) => {
    return deleteData(`http://127.0.0.1:8080/v1/clases/delete`, student)
}
