import { postData, getData } from '../utils/requestUtils'

export const createUser = (user) => {
    //getUsers('https://p99test.fly.dev/v1/users')
    postData('https://p99test.fly.dev/v1/users/create', {user})
    .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    });
}

export const getUser = () => {
    return getData(`https://p99test.fly.dev/v1/users/`)
}
