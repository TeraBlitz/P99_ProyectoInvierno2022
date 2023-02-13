const clasesSchema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        clave: {type: "string"},
        area: {type: "string"},
        modalidad: {type: "string"},
        nombre_curso: {type: "string"},
        nivel: {type: "string"},
        cupo_maximo: {type: "string",pattern: "^([0-9])*$"},
        cupo_actual: {type: "string",pattern: "^([0-9])*$"},
        edad_minima: {type: "string", minLength:1, maxLength:2,pattern: "^([0-9])*$"},
        edad_maxima: {type: "string", minLength:1, maxLength:2,pattern: "^([0-9])*$"},
        lunes: {type: "string"},
        martes: {type: "string"},
        miercoles: {type: "string"},
        jueves: {type: "string"},
        viernes: {type: "string"},
        sabado: {type: "string"},
        clavePeriodo: {type: "string"},
        nombreProfesor: {type: "string"},
        apellidosProfesor: {type: "string"},
        matriculaProfesor: {type: "string"},
    },
    required: [
        "clave",
        "area",
        "modalidad",
        "nombre_curso",
        "nivel",
        "cupo_maximo",
        "edad_minima",
        "edad_maxima",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "clavePeriodo",
        "nombreProfesor",
        "apellidosProfesor",
        "matriculaProfesor",
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

export {
    clasesSchema
}