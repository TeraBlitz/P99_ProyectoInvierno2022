const userSchema = {
    type: "object",
    properties: {
        user_name: {type: "string"},
        rol: {type: "string"},
        correo: {type: "string", format: "email"},
        password: {type: "string", format: "password"}
    },
    required: [
        "user_name",
        "rol",
        "correo",
        "password"
    ],
    additionalProperties: false,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {userSchema}