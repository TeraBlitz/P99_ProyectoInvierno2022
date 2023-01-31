import { postData, getData, putData, deleteData } from '../utils/requestUtils'

export const createClass = (student) => {
    return postData('https://p99test.fly.dev/v1/clases/create/', student)
}

export const updateClass = (student) => {
    return putData('https://p99test.fly.dev/v1/clases/update/', student)
}

export const getClasses = () => {
    return getData(`https://p99test.fly.dev/v1/clases/`)
}

export const deleteClasses = (student) => {
    return deleteData(`https://p99test.fly.dev/v1/clases/delete`, student)
}
