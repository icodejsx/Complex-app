const usersCollection = require('../db').db().collection('users')
const validator = require("validator");
const bcrypt = require('bcryptjs');
const md5 = require('md5');
let User = function (data, getAvatar) {
    this.data = data;
    this.errors = []
    if (getAvatar == undefined) { getAvatar = false }
    if (getAvatar) { this.getAvatar() }
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
    return new Promise(async (resolve, reject) => {
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
        if (this.data.password.length > 50) {
            this.errors.push("password cannpt exceed 50 character ")
        }

        if (this.data.username.length > 0 && this.data.username.length < 3) {
            this.errors.push('username must be at least 3 characters')
        }
        if (this.data.username.length > 30) {
            this.errors.push("username cannot exceed 30 charatcter ")
        }

        // Only if user name is valid check if its only taken

        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({ username: this.data.username })
            if (usernameExists) { this.errors.push('That username is already Taken') }
        }

        // Only if email is valid check if its only taken


        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({ email: this.data.email })
            if (emailExists) { this.errors.push('That email is already Taken') }
        }

        resolve()
    }
    )
}
// login model
User.prototype.login = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({ username: this.data.username }).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                this.data = attemptedUser
                this.getAvatar()
                resolve('congrats')
            } else {
                reject("invalid user name / password")
            }
        }).catch(function (err) {
            reject("please try again later")
        })
    })
}


User.prototype.register = function () {
    return new Promise(async (resolve, reject) => {
        // step #1: validate user data
        this.cleanUp()
        await this.validate()
        // #2: only if there are no validation errors

        // then save the user data into a database 

        if (!this.errors.length) {
            // hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            this.getAvatar()
            resolve()
        } else {
            reject(this.errors)
        }
    }
    )
}


// Avater update

User.prototype.getAvatar = function () {
    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}

module.exports = User;
