const postCollection = require('../db').db().collection('posts')
const ObjectID = require('mongodb').ObjectId

let Post = function (data, userId) {
    this.data = data;
    this.errors = []
    this.userId = userId
}

Post.prototype.cleanUp = function () {
    if (typeof (this.data.title) != 'string') {
        this.data.title = ""
    }
    if (typeof (this.data.body) != 'string') {
        this.data.body = ""
    }
    // get rid of any bogus proprties
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: new ObjectID(this.userId)
    }
}
Post.prototype.validate = function () {
    if (this.data.title == '') {
        this.errors.push('you must provide a title')
    }
    if (this.data.body == '') {
        this.errors.push('you must provide a post content')
    }
}

Post.prototype.create = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            // store post to data base
            postCollection.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push('please try again later')
                reject(this.errors)
            })

        } else {
            reject(this.errors)
        }
    })
}

Post.findSingleById = function (id) {
    return new Promise(async function (resolve, reject) {
        if (typeof (id) != 'string' || !ObjectID.isValid(id)) {
            reject()
            return
        }
        let post = await postCollection.findOne({ _id: new ObjectID(id) })
        if (post) {
            resolve(post)
        } else {
            reject()
        }
    })
}


module.exports = Post