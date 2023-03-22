export const defaultStudentInfo = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  num_telefono: '',
  fecha_de_nacimiento: '',
  escolaridad: '',
  ultima_escuela: '',
  estado: '',
  ciudad: '',
  colonia: '',
  codigo_postal: '',
  pais: '',
  tutor_nombre: '',
  tutor_apellido_paterno: '',
  tutor_apellido_materno: '',
  tutor_correo: '',
  tutor_num_telefono: '',
};

export const estadosMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal',
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
]

export const nivelEscolaridad = [
  'Preescolar',
  'Primaria',
  'Secundaria',
  'Bachillerato',
  'Licenciatura',
  'Universitario',
  'Especialidad o Maestria',
  'Doctorado'
]

export const controlPanelCards = [
  {
    id: '1',
    title: 'Inscripción',
    body: 'Acceder a sistema de inscripciones. Crea, actualiza y elimina los cursos.',
    color: '#366ac3',
    link: 'inscripcion',
  },
  {
    id: '2',
    title: 'Profesores',
    body: 'Administrar los profesores y visualizar su información.',
    color: '#5F8AD4',
    link: 'Profesores',
  },
  {
    id: '3',
    title: 'Alumnos',
    body: 'Administrar los alumnos y visualizar su información.',
    color: '#89ABE4',
    link: 'Alumnos',
  },
  {
    id: '4',
    title: 'Periodos',
    body: 'Administrar el periodo escolar actual y próximos periodos.',
    color: '#b2cbf5',
    link: 'Periodos',
  },
];

export const profesorVacio = {
  _id: '',
  nombre: '',
  apellidos: '',
  matricula: '',
  correo: '',
  fecha_de_nacimiento: '',
  num_telefono: '',
  num_cursos_impartidos: '',
  idUser: '',
};

export const alumnoVacio = {
  _id: '',
  clave_unica_identificacion: '',
  curp: '',
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  fecha_de_nacimiento: '',
  tutor_nombre: '',
  tutor_apellido_paterno: '',
  tutor_apellido_materno: '',
  tutor_correo: '',
  tutor_num_telefono: '',
  num_telefono: '',
  pais: '',
  estado: '',
  ciudad: '',
  colonia: '',
  codigo_postal: '',
  escolaridad: '',
  ultima_escuela: '',
};

export const classAtributes = [
  { key: 'area', value: 'Area' },
  { key: 'clave', value: 'Clave' },
  { key: 'nombre_curso', value: 'Curso' },
  { key: 'edad_minima', value: 'Edad Minima' },
  { key: 'edad_maxima', value: 'Edad Maxima' },
  { key: 'cupo_maximo', value: 'Cupo Maximo' },
  { key: 'cupo_actual', value: 'Cupo Actual' },
];

export const dayAtributes = [
  { key: 'lunes', value: 'Lunes' },
  { key: 'martes', value: 'Martes' },
  { key: 'miercoles', value: 'Miercoles' },
  { key: 'jueves', value: 'Jueves' },
  { key: 'viernes', value: 'Viernes' },
  { key: 'sabado', value: 'Sabado' },
];

export const niveloptions = [
  'desde cero', 
  'con bases', 
  'intermedio', 
  'avanzado'
];

export const nivelesMapa = {
  '1': 'desde cero',
  '2': 'con bases',
  '3': 'intermedio',
  '4': 'avanzado'
};

export const claseActualDefault = {
  _id: '',
  clave: '',
  nombre_curso: '',
  nivel: '',
  matriculaProfesor: '',
  edades: '',
  cupo_maximo: '',
  modalidad: '',
  fechas: '',
  niveles: '',
  nombreCompleto: '',
  nombreProfesor: '',
  apellidoProfesor: '',
}

export const classTemplate = {
  clave: '',
  nombre_curso: '',
  nivel: '',
  matriculaProfesor: '',
  nombreProfesor: '',
  nombreCompleto: '',
  apellidoProfesor: '',
  edad_minima: '',
  edad_maxima: '',
  cupo_maximo: '',
  modalidad: '',
  lunes: '',
  martes: '',
  miercoles: '',
  jueves: '',
  viernes: '',
  sabado: '',
  clavePeriodo: '',
  area: '',
  cupo_actual: '',
  niveles: '',
};

export const profesorVacioInscripcion = {
  nombreProfesor: '',
  matriculaProfesor: '',
  apellidoProfesor: '',
  nombreCompleto: '',
  correo: '',
};