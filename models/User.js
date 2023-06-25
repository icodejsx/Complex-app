const usersCollection = require('../db').collection('users')
const validator = require("validator");
let User = function (data) {
    this.data = data;
    this.errors = []
}


User.prototype.cleanUp = function () {
    if (typeof (this.data.username) != "string") {
        this.data.username = ""
    }
    if (typeof (this.data.email) != "string") {
        this.data.email = ""
    }
    if (typeof (this.data.password) != "string") {
        this.data.password = ""
    }

    // get rid of any bogus properties 
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }

}

User.prototype.validate = function () {
    if (this.data.username == '') {
        this.errors.push('username must not be empty')
    }
    if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) { this.errors.push('user name can only contain letters and numbers ') }
    if (!validator.isEmail(this.data.email)) {
        this.errors.push('email must not be empty')
    }
    if (this.data.password == '') {
        this.errors.push('password must not be empty')
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push('password must be at least 12 characters')
    }
    if (this.data.password.length > 100) {
        this.errors.push("password cannpt exceed 100 character ")
    }

    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push('username must be at least 3 characters')
    }
    if (this.data.username.length > 30) {
        this.errors.push("username cannot exceed 30 charatcter ")
    }
}

// login model
User.prototype.login = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        const attemptedUser = await usersCollection.findOne({ username: this.data.username })
        if (attemptedUser && attemptedUser.password == this.data.password) {
            resolve('congrats')

        } else {
            reject("invalid user name / password")
        }
    })
}

User.prototype.register = function () {
    // step #1: validate user data
    this.cleanUp()
    this.validate()
    // #2: only if there are no validation errors

    // then save the user data into a database 

    if (!this.errors.length) {
        usersCollection.insertOne(this.data)
    }
}

module.exports = User;