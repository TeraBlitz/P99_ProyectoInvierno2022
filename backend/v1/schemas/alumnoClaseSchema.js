const alumnoClaseSchema = {
    type: "object",
    properties: {
      idAlumno: { type: "string" },
      idClase: { type: "string" },
    },
    required: [
      "idAlumno",
      "idClase",
    ],
    additionalProperties: true,
    errorMessage: {
      type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
  };
  
  module.exports = { alumnoClaseSchema };