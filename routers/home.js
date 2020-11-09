const express = require('express')
const router = express.Router()
const Articles = require('../models/Articles')
const User = require('../models/User')
const { checkAuth, isLoggedIn } = require('../misc/middleware')
const { mongoose } = require('mongoose')

router.get('/home', isLoggedIn, checkAuth, async(req, res) => {

    const userID = req.user._id
    try {
        const articles = await Articles.find({ user: userID }).lean();
        //console.log(articles);


        res.render('home', { articles: articles, isLoggedIn: req.isLoggedIn });

    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})

router.post('/home', checkAuth, async(req, res) => {
    const { articleName, articleUrl, panel, category } = req.body

    const userID = req.user._id
    console.log(userID);

    const article = new Articles({
        articleName: articleName,
        articleUrl: articleUrl,
        category: category,
        panel: panel,
        user: userID


    })

    try {
        const created = await article.save()
        console.log(`Success, article created\n ${created}`);
        res.redirect('/home')
    } catch (err) {
        res.send('You must submit valid data')
    }
})

module.exports = router