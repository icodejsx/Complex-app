const express = require('express');
const app = express()

const router = require("./router");
console.log(router)


app.use(express.static("public"))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', function (raq, res) {
    res.render('home-guest')
})

app.listen(5000)