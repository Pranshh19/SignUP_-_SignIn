const mongoose = require('mongoose')
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is Required'],
        minLength: [5, 'Name must be at Least 5 char'],
        maxLength: [50, "Name must be less than 50 char"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is Required'],
        unique: true,
        lowercase: true,
        trim: true,  //space hata deta
        unique: [true, "already registered"]
    },
    password: {
        type: String,
       select: false
    },
    forgotPasswordToken: {
        type: String,
        required: false
    },
    forgotPasswordExpiryDate: {
        type: Date,
        required: false
    },

}, {
    timestamps: true
})

const secretkey = "hi";
userSchema.methods = {
    
    jwtToken() {
        return JWT.sign(
            { id: this._id, email: this.email},
            secretkey,
            {expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;