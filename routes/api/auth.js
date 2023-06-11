const express = require('express')
const {authCtrl} = require('../../controllers')
const {validatePostBody, validatePutBody, isValidId, authenticate} = require('../../middlewares')
const { schemas } = require('../../models/users')

const router = express.Router();

router.post('/register', validatePostBody(schemas.registerSchema), authCtrl.register)

router.post('/login', validatePostBody(schemas.loginSchema), authCtrl.login)

router.post('/logout', authenticate, authCtrl.logout)

router.get('/current', authenticate, authCtrl.current)

module.exports = router;