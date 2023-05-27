const express = require('express')
const ctrl = require('../../controllers/contacts')
const {validatePostBody, validatePutBody, isValidId} = require('../../middlewares')
const { addSchema, updateFavoriteSchema } = require('../../models/contact')
const router = express.Router()


router.get('/', ctrl.listContacts)

router.get('/:id', isValidId, ctrl.getContactById)

router.post('/', validatePostBody(addSchema), ctrl.addContact)

router.put('/:id', isValidId, validatePutBody(addSchema), ctrl.updateContact)

router.patch('/:id/favorite', isValidId, validatePutBody(updateFavoriteSchema), ctrl.updateFavorite)

router.delete('/:id', isValidId, ctrl.removeContact)

module.exports = router
