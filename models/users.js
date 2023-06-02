const { model, Schema } = require('mongoose')
const Joi = require("joi")
const { handleMongooseError } = require('../helpers')

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
      required: [true, 'Email is required'],
      unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
    },
//    owner: {
//       type: Schema.Types.ObjectId,
//       ref: 'user',
//     },
//   token: String

}, { versionKey: false, timestamps: true })

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
})
const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
  password: Joi.string().required(),
  // subscription: Joi.string().required(),
})

const schemas = {
    registerSchema,
    loginSchema
}

const User = model('user', userSchema)

module.exports = {  User, schemas }