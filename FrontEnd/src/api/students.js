import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createStudent = (student) => {
    return postData('/v1/alumnos/create/', student)
}

export const updateStudent = (student) => {
    return putData('/v1/alumnos/update/', student)
}

export const getStudents = () => {
    return getData(`/v1/alumnos/`)
}

export const deleteStudent = (student) => {
    return deleteData(`/v1/alumnos/delete`, student)
}

export const findStudents = (user) => {
    return postData(`/v1/alumnos/find`, user)
}
