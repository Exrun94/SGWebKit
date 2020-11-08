const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
    res.clearCookie('aid')
    res.redirect('/')
})

module.exports = router