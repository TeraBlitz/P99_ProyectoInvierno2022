const clasesSchema = {
    type: "object",
    properties: {
        id: {type: "string"},
        nombre_curso: {type: "string"},
        nivel: {type: "string"},
        idMaestro: {type: "string"},
        frecuencia_semanal: {type: "string"},
        cupo_maximo: {type: "string"}
    },
    required: [
        "nombre_curso","nivel","idMaestro","frecuencia_semanal","cupo_maximo"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {clasesSchema}