const dotenv = require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const connectDB = require('./config/database')()
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();

const app = express()

// Handlebars config
app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layouts/main.hbs',
    partialsDir: 'views/partials',
    extname: 'hbs',
    helpers: multihelpers
}))
app.set('view engine', 'hbs')

// Middleware
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


// Routes
app.use('/', require('./routers/home'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})