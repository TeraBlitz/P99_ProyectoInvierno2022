import { postData, getData } from '../utils/requestUtils'

export const createWaitList = (body) => {
    return postData('http://127.0.0.1:3000/v1/listas/create', body)
}

export const findWaitList = (id) => {
    return postData('http://127.0.0.1:3000/v1/listas/create', id)
}

export const getWaitList = () => {
    return getData(`http://127.0.0.1:3000/v1/listas`)
}