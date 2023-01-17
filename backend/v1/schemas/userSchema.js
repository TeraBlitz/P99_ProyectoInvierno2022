const userSchema = {
    type: "object",
    properties: {
        curp: {type: "string"},
        tipo_usuario: {type: "string"},
        nombre: {type: "string"},
        apellido_paterno: {type: "string"},
        apellido_materno: {type: "string"},
        edad: {type: "string"},
        tutor: {type: "string"},
        lada: {type: "string"},
        num_telefono: {type: "string"},
        estado: {type: "string"},
        ciudad: {type: "string"},
        colonia: {type: "string"},
        escolaridad: {type: "string"},
        ultima_escuela: {type: "string"},
        correo: {type: "string", format: "email"}
    },
    required: [
        "curp","tipo_usuario","nombre","apellido_paterno","apellido_materno","edad","tutor","lada",
        "num_telefono","estado","ciudad","colonia","escolaridad","ultima_escuela","correo"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {userSchema}