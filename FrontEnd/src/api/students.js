import { postData, getData } from '../utils/requestUtils'

export const createStudent = (student) => {
    postData('http://127.0.0.1:3000/v1/alumnos/create', {student})
    .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    });
}

export const getStudents = () => {
    return getData(`http://127.0.0.1:3000/v1/alumnos/`)
}