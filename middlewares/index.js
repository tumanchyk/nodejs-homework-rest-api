const {validatePostBody, validatePutBody} = require('./validateBody')
const isValidId = require('./isValidId')
const authenticate = require('./authenticate')
module.exports = {validatePostBody, validatePutBody, isValidId, authenticate}