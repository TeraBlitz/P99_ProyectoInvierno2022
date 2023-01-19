const clasesSchema = {
    type: "object",
    properties: {
        nombre_curso: {type: "string"},
        nivel: {type: "string"},
        frecuencia_semanal: {type: "string"},
        cupo_maximo: {type: "string",pattern: "^([0-9])*$"},
        cupo_actual: {type: "string",pattern: "^([0-9])*$"},
        idMaestro: {type: "string"},
        clavePeriodo: {type: "string"}
    },
    required: [
        "nombre_curso",
        "nivel",
        "frecuencia_semanal",
        "cupo_maximo",
        "cupo_actual",
        "idMaestro",
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {clasesSchema}