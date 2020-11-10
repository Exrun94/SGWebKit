const express = require('express')
const router = express.Router()

router.get('*', (req, res) => {
  res.render('layouts/404', { layout: 'layouts/404' })
})

module.exports = router