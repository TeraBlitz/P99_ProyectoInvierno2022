const userSchema = {
    type: "object",
    properties: {
        user_name: {type: "string"},
        correo: {type: "string", format: "email"},
        password: {type: "string", format: "password"},
        status: {type: "string"},
        rol: {type: "string"}
    },
    required: [
        "user_name",
        "correo",
        "password",
        "status",
        "rol"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

export {
    userSchema
}