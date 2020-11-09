const dotenv = require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./config/database')()
const hbshelpers = require('handlebars-helpers')
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
app.use(methodOverride('_method'))


// Routes
app.use('/', require('./routers/home'))
app.use('/', require('./routers/dns'))
app.use('/', require('./routers/htaccess'))
app.use('/', require('./routers/register'))
app.use('/', require('./routers/login'))
app.use('/', require('./routers/logout'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})