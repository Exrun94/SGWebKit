const express = require('express')
const router = express.Router()
const { checkAuth, isLoggedIn } = require('../misc/middleware')
const {
    defaultRules,
    upgradeMixedContent,
    cors,
    wordpressTimeout,
    othersTimeout,
    wwwRedirect,
    non_wwwRedirect
} = require('../misc/htaccessRules')



router.get('/htaccess', checkAuth, async(req, res) => {

    res.render('htaccess', {
        defaultRules: defaultRules,
        upgradeMixedContent: upgradeMixedContent,
        cors: cors,
        wordpressTimeout: wordpressTimeout,
        othersTimeout: othersTimeout
    })
})

router.post('/htaccess/www', (req, res) => {
    const domain = req.body.domain

    const www = wwwRedirect(domain)

    res.render('htaccess', { www: www })
})

router.post('/htaccess/non_www', (req, res) => {
    const domain = req.body.domain

    const non_www = non_wwwRedirect(domain)

    res.render('htaccess', { non_www: non_www })
})



module.exports = router