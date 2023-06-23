const { MongoClient } = require('mongodb')


const client = new MongoClient('mongodb+srv://kene:nweke081@cluster0.xc7hoie.mongodb.net/ComplexApp?retryWrites=true&w=majority')

async function start() {
    await client.connect()
    module.exports = client.db()
    const app = require('./app')
    app.listen(5000)
}

start()