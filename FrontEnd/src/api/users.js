import { postData, getData, putData } from '../utils/requestUtils'

export const createUser = (user) => {
    //getUsers('https://p99test.fly.dev/v1/users')
    postData('/v1/users/create', user)
}

export const getUser = () => {
    return getData(`/v1/users/`)
}

export const updateUser = (user, userID) => {
    return putData(`/v1/users/update/${userID}`, user)
}