const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "drfk8jcj7",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports =  cloudinary