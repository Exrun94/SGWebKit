const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/User')

const generateToken = data => {
    const token = jwt.sign(data, process.env.PRIVATE_KEY)
    return token
}

router.get('/register', (req, res) => {
    res.render('layouts/register', { layout: 'layouts/register' })
})

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log(firstName, lastName, email, password);

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    const registerUser = User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        articles: []
    })

    try {

        const user = registerUser.save()

        const token = generateToken({
            userID: user._id,
            username: user.firstName
        })

        res.cookie('aid', token)
        res.cookie('user', firstName, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        })

        console.log(req.cookies);
        res.redirect('/')
    } catch (err) {
        console.log(err);
        return res.redirect('/register');
    }


})

module.exports = router