const express = require('express')
const router = express.Router()
const Articles = require('../models/Articles')

router.get('/home', async(req, res) => {


    try {
        const articles = await Articles.find({}).lean();


        res.render('home', { articles: articles });

    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})

router.post('/home', async(req, res) => {
    const { articleName, articleUrl, panel, category } = req.body
    console.log('Form Data: ' + articleName, articleUrl, panel, category);

    const article = new Articles({
        articleName: articleName,
        articleUrl: articleUrl,
        category: category,
        panel: panel
    })

    try {
        const created = await article.save()
        console.log(`Success, article created\n ${created}`);
        res.redirect('/home')
    } catch (err) {
        res.status(500).send('Something went wrong')
    }
})

module.exports = router