const {validatePostBody, validatePutBody} = require('./validateBody')
const isValidId = require('./isValidId')
const authenticate = require('./authenticate')
const upload = require('./upload')
module.exports = {validatePostBody, validatePutBody, isValidId, authenticate, upload}