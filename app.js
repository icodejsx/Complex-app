const express = require('express');
const app = express()

app.get('/', function (raq, res) {
    res.send('welcome to our new file')
})

app.listen(5000)