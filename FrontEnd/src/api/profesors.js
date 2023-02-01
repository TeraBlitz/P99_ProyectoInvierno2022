import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createProfesor = (profesor) => {
    return postData('/v1/profesores/create/', profesor)
}

export const updateProfesor = (profesor) => {
    return putData('/v1/profesores/update/', profesor)
}

export const getProfesors = () => {
    return getData(`/v1/profesores/`)
}

export const deleteProfesor = (profesor) => {
    return deleteData(`/v1/profesores/delete`, profesor)
}
