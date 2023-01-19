const asistenciaSchema = {
    type: "object",
    properties: {
        idUsuario: {type: "string"},
        idClase: {type: "string"},
        fecha: {type: "string", format: "date"},
        asistio: {type: "string"}
    },
    required: [
        "idUsuario","idClase","fecha","asistio"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {asistenciaSchema}