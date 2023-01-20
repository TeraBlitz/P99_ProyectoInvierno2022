const profesoroSchema = {
    type: "object",
    properties: {
      nombre: { type: "string" },
      apellido_paterno: { type: "string" },
      apellido_materno: { type: "string" },
      fecha_de_nacimiento: { type: "string", format: "date" },
      num_telefono: { type: "string", minLength:10, maxLength:10, pattern: "^([0-9])*$" },
      num_cursos_impartidos: { type: "string" },
      idUser: { type: "string" }
    },
    required: [
      "nombre",
      "apellido_paterno",
      "apellido_materno",
      "fecha_de_nacimiento",
      "num_telefono",
      "num_cursos_impartidos",
    ],
    additionalProperties: true,
    errorMessage: {
      type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
  };
  
  module.exports = { profesoroSchema };