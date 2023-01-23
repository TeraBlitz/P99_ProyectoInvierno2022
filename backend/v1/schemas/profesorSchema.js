const profesoroSchema = {
    type: "object",
    properties: {
      nombre: { type: "string" },
      apellidos: { type: "string" },
      matricula: { type: "string" },
      correo: { type: "string" },
      fecha_de_nacimiento: { type: "string", format: "date" },
      num_telefono: { type: "string", minLength:10, maxLength:10, pattern: "^([0-9])*$" },
      num_cursos_impartidos: { type: "string" },
      idUser: { type: "string" }
    },
    required: [
      "nombre",
      "apellidos",
      "matricula",
      "correo",
    ],
    additionalProperties: false,

    errorMessage: {
      type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
  };
  
  module.exports = { profesoroSchema };