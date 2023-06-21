const validator = require("validator");
let User = function (data) {
    this.data = data;
    this.errors = []
}

User.prototype.validate = function () {
    if (this.data.username == '') {
        this.errors.push('username must not be empty')
    }
    if (!validator.isEmail(this.data.email)) {
        this.errors.push('email must not be empty')
    }
    if (this.data.password == '') {
        this.errors.push('password must not be empty')
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.data.push('password must be at least 12 characters')
    }
    if (this.data.password.lenght > 10) {
        this.errors.push("password cannpt exceed 100 charatcter ")
    }

    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.data.push('username must be at least 3 characters')
    }
    if (this.data.username.lenght > 30) {
        this.errors.push("username cannot exceed 30 charatcter ")
    }
}

User.prototype.register = function () {
    // step #1: validate user data
    this.validate()
    // #2: only if there are no validation errors
    // then save the user data into a database 
}

module.exports = User;