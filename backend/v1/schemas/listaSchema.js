const listaSchema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        idAlumno: {type: "string"},
        idClase: {type: "string"},
        time_stamp_: {type: "string", format:"date-time"},
        status: {type: "string"}
    },
    required: [
        "idAlumno",
        "idClase",
        "time_stamp_",
        "status"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {listaSchema}