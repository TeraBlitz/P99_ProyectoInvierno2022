import {
  getData,
  postData,
  putData
} from '../utils/requestUtils';

export const insertAlumnoFormulario = (alumnoFormulario) => postData('/v1/alumnoFormularios/insert/', alumnoFormulario);

export const updateAlumnoFormulario = (idAlumno, idFormulario, alumnoFormulario) => putData(`/v1/alumnoFormularios/idAlumno/${idAlumno}/idFormulario/${idFormulario}`, alumnoFormulario);

export const getAlumnoFormularios = (idAlumno) => getData(`/v1/alumnoFormularios/idAlumno/${idAlumno}`);

export const getAlumnoFormularioById = (idAlumno, idFormulario) => getData(`/v1/alumnoFormularios/idAlumno/${idAlumno}/idFormulario/${idFormulario}`);

export default { insertAlumnoFormulario, updateAlumnoFormulario, getAlumnoFormularios, getAlumnoFormularioById };
