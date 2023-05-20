const { HttpError } = require('../helpers')

const validatePutBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            throw HttpError(400, 'Missing fields')
        }
        next()
    }
    return func
}
const validatePostBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            throw HttpError(400, 'Missing required name field')
        }
        next()
    }
    return func
}

module.exports = {validatePostBody, validatePutBody}