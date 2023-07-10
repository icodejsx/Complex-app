const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express()

let sessionOptions = session({
    secret: "javascript is so cool",
    store: MongoStore.create({ client: require('./db') }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httOnly: true },
})

app.use(sessionOptions)
app.use(flash())

app.use(function (req, res, next) {
    // make current user id available on the re object
    if (req.session.user) { req.visitorId = req.session.user._id } else { req.visitorId = 0 }

    //    make user session data available for within view template


    res.locals.user = req.session.user
    next()
})

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)


module.exports = app;