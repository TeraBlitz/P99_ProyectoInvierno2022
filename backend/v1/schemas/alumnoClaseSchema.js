const alumnoClaseSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      idAlumno: { type: "string" },
      idClase: { type: "string" },
      idPeriodo: { type: "string" },
    },
    required: [
      "idAlumno",
      "idClase",
      "idPeriodo",
    ],
    additionalProperties: false,
    errorMessage: {
      type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
  };
  
  module.exports = { alumnoClaseSchema };