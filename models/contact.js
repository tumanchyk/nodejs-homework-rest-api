const { model, Schema } = require('mongoose')
const Joi = require("joi")
const { handleMongooseError } = require('../helpers')

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
     owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
    }
})
 
const addSchema = Joi.object({
  name: Joi.string().required().min(3).max(25),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

contactsSchema.post('save', handleMongooseError)

const Contact = model('contact', contactsSchema);

module.exports = {Contact, addSchema, updateFavoriteSchema}
