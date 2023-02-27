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