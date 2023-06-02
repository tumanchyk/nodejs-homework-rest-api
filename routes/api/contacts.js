const express = require('express')
const {contactsCtrl} = require('../../controllers')
const {validatePostBody, validatePutBody, isValidId} = require('../../middlewares')
const { addSchema, updateFavoriteSchema } = require('../../models/contact')
const router = express.Router()


router.get('/', contactsCtrl.listContacts)

router.get('/:id', isValidId, contactsCtrl.getContactById)

router.post('/', validatePostBody(addSchema), contactsCtrl.addContact)

router.put('/:id', isValidId, validatePutBody(addSchema), contactsCtrl.updateContact)

router.patch('/:id/favorite', isValidId, validatePutBody(updateFavoriteSchema), contactsCtrl.updateFavorite)

router.delete('/:id', isValidId, contactsCtrl.removeContact)

module.exports = router
