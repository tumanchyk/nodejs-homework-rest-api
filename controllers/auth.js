const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')

const { User } = require('../models/users')
const { HttpError, ctrlWrapper } = require('../helpers')

const {SECRET_KEY} = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL})
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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, {token})
        
    res.status(200).json({token, user})
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""})

    res.status(204).json({
        message: "Logout success"
    })
}

const current  = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        email,
        subscription
    })
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarDir, filename);
    Jimp.read(tempUpload, (_, filename) => {
        filename.resize(250, 250).write(resultUpload);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
        avatarURL
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    updateAvatar: ctrlWrapper(updateAvatar)
}