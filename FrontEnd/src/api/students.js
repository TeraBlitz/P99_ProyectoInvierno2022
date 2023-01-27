import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createStudent = (student) => {
    return postData('https://p99test.fly.dev.dev/v1/alumnos/create/', student)
}

export const updateStudent = (student) => {
    return putData('https://p99test.fly.dev.dev/v1/alumnos/update/', student)
}

export const getStudents = () => {
    return getData(`https://p99test.fly.dev.dev/v1/alumnos/`)
}

export const deleteStudent = (student) => {
    return deleteData(`https://p99test.fly.dev.dev/v1/alumnos/delete`, student)
}

export const findStudents = (user) => {
    return postData(`https://p99test.fly.dev.dev/v1/alumnos/find`, user)
}