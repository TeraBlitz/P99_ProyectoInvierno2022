const schema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        idUsuario: {type: "integer"},
        idClse: {type: "integer"},
        fecha: {type: "string", format: "date"},
        asistio: {type: "integer"}
    },
    required: [
        "id","idUsuario","idClse","fecha","asistio"
    ],
    additionalProperties: false,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = clasesSchema