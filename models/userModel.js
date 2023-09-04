const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // trim: true
    },
    lastName: {
        type: String,
        required: true,
        // trim: true
    },
    email: {
        type: String,
        required: true,
        // trim: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        // trim: true
    }
}, {timestamps: true})


userSchema.pre("save", function (next) {
    let saltround = 10
    if (this.password !== undefined){
        bcryptjs.hash(this.password, saltround).then((hashedpassword)=>{
            this.password = hashedpassword
            next()
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    
})
const userModel = mongoose.models.Users || mongoose.model("Users", userSchema)
module.exports = userModel