// se agrega la regular expresion del curp para que sea implicita la forma que se hace un curp 
const alumnoSchema = {
  type: "object",
  properties: {
    curp: { type: "string",minLength:18, maxLength:18,  pattern:"[a-z|A-Z]{4}[0-9]{6}[H|M|m|h][A-Z|a-z]{5}[a-z|A-Z|0-9][0-9]"},
    clave_unica_identificacion: { type: "string"}, // Extranjeros
    nombre: { type: "string" },
    apellido_paterno: { type: "string" },
    apellido_materno: { type: "string" },
    fecha_de_nacimiento: { type: "string", format: "date" },
    tutor_nombre: { type: "string" },
    tutor_apellido_paterno: { type: "string" },
    tutor_apellido_materno: { type: "string" },
    tutor_correo: { type: "string" , format: "email"},
    tutor_num_telefono: { type: "string", minLength:10, maxLength:14},
    num_telefono: { type: "string", minLength:10, maxLength:14},
    pais: { type: "string" },
    estado: { type: "string" },
    ciudad: { type: "string" },
    colonia: { type: "string" },
    codigo_postal: { type: "string", minLength:5, maxLength:5, pattern: "^([0-9])*$" },
    escolaridad: { type: "string" },
    ultima_escuela: { type: "string" },
    idUser: { type: "string" },
  },
  required: [
    "nombre",
    "apellido_paterno",
    "apellido_materno",
    "fecha_de_nacimiento",
    "num_telefono",
    "pais",
    "estado",
    "ciudad",
    "colonia",
    "codigo_postal",
    "escolaridad",
    "ultima_escuela",
  ],
  additionalProperties: true,
  errorMessage: {
    type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
  },
};

module.exports = { alumnoSchema };
