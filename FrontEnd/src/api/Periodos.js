import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createPeriodo = (periodo) => {
    return postData('/v1/periodos/create/', periodo)
}

export const updatePeriodo = (periodo) => {
    return putData('/v1/periodos/update/', periodo)
}

export const getPeriodos = () => {
    return getData(`/v1/periodos`)
}

export const deletePeriodos = (periodo) => {
    return deleteData(`/v1/periodos/delete`, periodo)
}
export const findPeriodos = (idPeriodo) =>{
    return postData("/v1/periodos/find" , idPeriodo)
}


