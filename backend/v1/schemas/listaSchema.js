const listaSchema = {
    type: "object",
    properties: {
        idAlumno: {type: "string"},
        idClase: {type: "string"},
        lugar_de_espera: {type: "string", pattern: "^([0-9])*$"},
        status: {type: "string"}
    },
    required: [
        "idAlumno",
        "idClase",
        "lugar_de_espera",
        "status"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {listaSchema}