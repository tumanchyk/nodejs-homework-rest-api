const express = require('express')
const {authCtrl} = require('../../controllers')
const {validatePostBody, validatePutBody, isValidId} = require('../../middlewares')
const { schemas } = require('../../models/users')

const router = express.Router();

router.post('/register', validatePostBody(schemas.registerSchema), authCtrl.register)

router.post('/login', validatePostBody(schemas.loginSchema), authCtrl.login)

router.post('/logout', authCtrl.logout)

module.exports = router;