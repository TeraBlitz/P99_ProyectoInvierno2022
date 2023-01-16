const userSchema = {
    type: "object",
    properties: {
        user_name: {type: "string"},
        tipo_usuario: {type: "string"},
        correo: {type: "string", format: "email"},
        password: {type: "string"}
    },
    required: [
        "user_name","tipo_usuario","correo","password"
    ],
    additionalProperties: true,
    errorMessage: {
        type: "Debe ser un Objeto", // will not replace internal "type" error for the property "foo"
    },
}

module.exports = {userSchema}