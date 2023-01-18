import { postData } from '../utils/requestUtils'

export const createUser = (user) => {
    //getUsers('http://127.0.0.1:3000/v1/users')
    postData('http://127.0.0.1:3000/v1/users/create', {user})
    .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    });
}
