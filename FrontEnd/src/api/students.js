import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createStudent = (student) => {
    return postData('http://127.0.0.1:3000/v1/alumnos/create/', student)
}

export const updateStudent = (student) => {
    return putData('http://127.0.0.1:3000/v1/alumnos/update/', student)
}

export const getStudents = () => {
    return getData(`http://127.0.0.1:3000/v1/alumnos/`)
}

export const deleteStudent = (student) => {
    return deleteData(`http://127.0.0.1:3000/v1/alumnos/delete`, student)
}

export const findStudents = (user) => {
    return postData(`http://127.0.0.1:3000/v1/alumnos/find`, user)
}