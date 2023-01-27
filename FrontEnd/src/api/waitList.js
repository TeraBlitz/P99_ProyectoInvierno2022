import { postData, getData } from '../utils/requestUtils'

export const createWaitList = (body) => {
    return postData('https://p99test.fly.dev/v1/listas/create', body)
}

export const findWaitList = (id) => {
    return postData('https://p99test.fly.dev/v1/listas/create', id)
}

export const getWaitList = () => {
    return getData(`https://p99test.fly.dev/v1/listas`)
}