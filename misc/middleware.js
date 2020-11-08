const User = require('../models/User')
const jwt = require('jsonwebtoken');


function isLoggedIn(req, res, next) {
    const token = req.cookies['aid'];
    if (!token) {
        req.isLoggedIn = false;
    }

    try {
        jwt.verify(token, process.env.PRIVATE_KEY);
        req.isLoggedIn = true;
    } catch (e) {
        req.isLoggedIn = false;
    }
    next()
}

function checkGuest(req, res, next) {
    const token = req.cookies['aid'];
    if (!token) {
        return res.redirect('/');
    }
    next();
}

async function checkAuth(req, res, next) {
    const token = req.cookies['aid'];
    if (!token) {
        console.log(`no token`);
        return res.redirect('/');
    }

    try {
        decodedObject = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(decodedObject.userID);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.redirect('/');
    }
}

module.exports = {
    isLoggedIn,
    checkGuest,
    checkAuth
}