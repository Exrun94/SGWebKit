const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

const generateToken = data => {
    const token = jwt.sign(data, process.env.PRIVATE_KEY)
    return token
}


router.get('/', (req, res) => {
    res.render('layouts/login', { layout: 'layouts/login' })
})

router.post('/', async(req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    const user = await User.findOne({ email })
    if (!user) { return false }

    const status = await bcrypt.compare(password, user.password)
    if (status) {
        const token = generateToken({
            userID: user._id,
            username: user.firstName
        })

        //res.cookie.username
        res.cookie('aid', token);
        res.cookie('user', email, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });

        console.log(req.cookies);
        res.redirect('/home')
    }

    return status
})

module.exports = router