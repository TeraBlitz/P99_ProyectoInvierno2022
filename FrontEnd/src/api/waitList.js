import { postData, getData, deleteData } from '../utils/requestUtils'

export const createWaitList = (body) => {
    return postData('https://p99test.fly.dev/v1/listas/create', body)
}

export const findWaitList = (id) => {
    return postData('https://p99test.fly.dev/v1/listas/find', id)
}

export const getWaitList = () => {
    return getData(`https://p99test.fly.dev/v1/listas`)
}

export const deleteWaitList = (id) => {
    return deleteData('https://p99test.fly.dev/v1/listas/delete', id)
}