const clasesSchema = {
    type: "object",
    properties: {
        clave: {type: "string"},
        nombre_curso: {type: "string"},
        nivel: {type: "string"},
        frecuencia_semanal: {type: "string"},
        horario: {type: "string"},
        rango_edades: {type: "string"},
        cupo_maximo: {type: "string",pattern: "^([0-9])*$"},
        cupo_actual: {type: "string",pattern: "^([0-9])*$"},
        matriculaMaestro: {type: "string"},
        clavePeriodo: {type: "string"}
    },
    required: [
        "clave",
        "nombre_curso",
        "nivel",
        "frecuencia_semanal",
        "horario",
        "rango_edades",
        "cupo_maximo",
        "cupo_actual",
        "matriculaMaestro",
       
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {clasesSchema}