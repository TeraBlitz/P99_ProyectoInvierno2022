const clasesSchema = {
    type: "object",
    properties: {
        nombre_curso: {type: "string"},
        nivel: {type: "string"},
        idMaestro: {type: "string"},
        frecuencia_semanal: {type: "string"},
        cupo_maximo: {type: "string",pattern: "^([0-9])*$"},
        cupo_actual: {type: "string",pattern: "^([0-9])*$"}
    },
    required: [
        "nombre_curso","nivel","idMaestro","frecuencia_semanal","cupo_maximo","cupo_actual"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {clasesSchema}