const periodoSchema = {
type: "object",
    properties: {
        clave: {type: "string"},
        status: {type: "string"},
        fecha_inicio: {type: "string", format: "date"},
        fecha_fin: {type: "string", format: "date"},
        fecha_inicio_insc: {type: "string", format: "date"},
        fecha_fin_insc: {type: "string", format: "date"},
        cursos_max_por_alumno: {type: "string", pattern: "^([0-9])*$"},
        idiomas_max_por_alumno: {type: "string", pattern: "^([0-9])*$"}
    },
    required: [
        "clave","status","fecha_inicio","fecha_fin","fecha_inicio_insc","fecha_fin_insc",
        "cursos_max_por_alumno","idiomas_max_por_alumno"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {periodoSchema}