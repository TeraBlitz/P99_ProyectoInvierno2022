import {
  getData,
  postData,
} from '../utils/requestUtils';

export const insertAlumnoFormulario = (alumnoFormulario) => postData('/v1/alumnoFormularios/insert/', alumnoFormulario);

export const getAlumnoFormularios = (idAlumno) => getData(`/v1/alumnoFormularios/idAlumno/${idAlumno}`);

export const getAlumnoFormularioById = (idAlumno, idFormulario) => getData(`/v1/alumnoFormularios/idAlumno/${idAlumno}/idFormulario/${idFormulario}`);

export default { insertAlumnoFormulario };
