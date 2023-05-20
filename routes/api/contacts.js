const express = require('express')
const ctrl = require('../../controllers/contacts')
const {validatePostBody, validatePutBody} = require('../../middlewares')
const schema = require('../../schemas/contactsSchema')
const router = express.Router()


router.get('/', ctrl.listContacts)

router.get('/:id', ctrl.getContactById)

router.post('/', validatePostBody(schema.addSchema), ctrl.addContact)

router.delete('/:id', ctrl.removeContact)

router.put('/:id',validatePutBody(schema.addSchema), ctrl.updateContact)

module.exports = router
