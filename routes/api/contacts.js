const express = require('express')
const {contactsCtrl} = require('../../controllers')
const {validatePostBody, validatePutBody, isValidId, authenticate} = require('../../middlewares')
const { addSchema, updateFavoriteSchema } = require('../../models/contact')
const router = express.Router()


router.get('/', authenticate, contactsCtrl.listContacts)

router.get('/:id', authenticate, isValidId, contactsCtrl.getContactById)

router.post('/', authenticate, validatePostBody(addSchema), contactsCtrl.addContact)

router.put('/:id', authenticate, isValidId, validatePutBody(addSchema), contactsCtrl.updateContact)

router.patch('/:id/favorite', authenticate, isValidId, validatePutBody(updateFavoriteSchema), contactsCtrl.updateFavorite)

router.delete('/:id', authenticate, isValidId, contactsCtrl.removeContact)

module.exports = router
