const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const { User } = require('../models/users')
const { HttpError, ctrlWrapper } = require('../helpers')

const {SECRET_KEY} = process.env;


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({email: newUser.email})
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    console.log(SECRET_KEY);
    res.json({token})
}
const logout = async (req, res) => {
    
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout)
}