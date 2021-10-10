const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    isPremium:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("Users", UserSchema)

module.exports = User;