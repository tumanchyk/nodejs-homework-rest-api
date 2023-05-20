const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require("joi")
const {HttpError} = require('../../helpers')
const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required().min(3).max(25),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
  phone: Joi.string().required()
})


router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts)
  } catch (error) {
      next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw HttpError(404, 'Not found');
    }
    res.json(oneContact)
  } catch (error) {
      next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, 'Missing required name field')
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact)
  } catch (error) {
      next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contacts.removeContact(id);
    if (!removedContact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Contact deleted' })

  } catch (error) {
      next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, 'Missing fields')
    }
    const updatedContact = await contacts.updateContact(id, req.body);
    if (!updatedContact) {
      throw HttpError(404, 'Not found')
    }
    res.json(updatedContact)
  } catch (error) {
      next(error)
  }
})

module.exports = router
