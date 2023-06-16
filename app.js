const express = require('express');
const app = express()

app.use(express.static("public"))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', function (raq, res) {
    res.render('home-guest')
})

app.listen(5000)