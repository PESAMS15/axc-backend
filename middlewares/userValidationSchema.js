const yup = require("yup")
const userValidationSchema = yup.object().shape({
    firstName : yup
    .string()
    .min(2, "firstname is too short")
    .max(50, "Too long")
    .required("firstname is required")
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    lastName : yup
    .string()
    .min(2, "lastname is too short")
    .max(50, "Too long")
    .required("lastname is required")
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
    password: yup
    .string()
    .required("Password is required")
    .min(8, "password is too short")
    .matches(/^[a-zA-Z0-9]+$/, "Password cannot have a symbol")
})

module.exports = {userValidationSchema}