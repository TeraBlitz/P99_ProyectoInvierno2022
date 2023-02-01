import { postData, getData, deleteData } from '../utils/requestUtils'

export const createWaitList = (body) => {
return postData('/v1/listas/create', body)
}

export const findWaitList = (id) => {
    return postData('/v1/listas/find', id)
}

export const getWaitList = () => {
    return getData(`/v1/listas`)
}

export const deleteWaitList = (id) => {
    return deleteData('/v1/listas/delete', id)
}
