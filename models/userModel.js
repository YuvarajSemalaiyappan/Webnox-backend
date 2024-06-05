const mongoose = require('mongoose');
const Joi = require('joi');
const zxcvbn = require('zxcvbn');


const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .min(8)
    .max(128)
    .required(),
});


const userMongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minlength: [3, 'Your name must be at least 3 characters'],
    maxlength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: [
      {
        validator: function (value) {
          const passwordStrength = zxcvbn(value).score;
          return passwordStrength >= 3; 
        },
        message: 'Password is too weak',
      },
      {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value);
        },
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userMongooseSchema.validateUser = async function (user) {
  return userSchema.validateAsync(user);
};


const User = mongoose.model('User', userMongooseSchema);


module.exports = User;