const clasesSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        nombre_curso: {type: "string"},
        nivel: {type: "integer"},
        idMaestro: {type: "integer"},
        frecuencia_semanal: {type: "string"},
        cupo_maximo: {type: "integer"}
    },
    required: [
        "id","nombre_curso","nivel","idMaestro","frecuencia_semanal","cupo_maximo"
    ],
    additionalProperties: false,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {clasesSchema}