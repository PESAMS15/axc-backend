const yup = require("yup")
const userValidationSchema = yup.object().shape({
    firstName : yup
    .string()
    .min(2, "firstname is too short")
    .max(50, "Too long")
    .required("firstname is required"),
   
    lastName : yup
    .string()
    .min(2, "lastname is too short")
    .max(50, "Too long")
    .required("lastname is required"),
    email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
    password: yup
    .string()
    .required("Password is required")
    .min(8, "password must be at least 8 characters"),
    
})

module.exports = {userValidationSchema}