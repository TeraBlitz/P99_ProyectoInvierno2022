
import { postData, getData, deleteData } from '../utils/requestUtils'

export const subirProfes = (profesores) => {
    return postData('/v1/csv/subirProfesores', profesores)
}

export const subirClases = (clases) => {
    return postData(`/v1/csv/subirClases` , clases)
}

