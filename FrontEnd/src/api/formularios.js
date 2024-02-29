import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const getFormularios = () => {
    return getData(`/v1/formularios/`)
}

export const getFormularioById = (id) => {
    return getData(`/v1/formularios/${id}`)
}