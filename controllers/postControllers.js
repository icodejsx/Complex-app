const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
    res.render('create-post')
}

exports.create = function (req, res) {
    let post = new Post(req.body, req.session.user._id)
    post.create().then(function () {
        res.send("New post created")
    }).catch(function (errors) {
        res.send(errors)
    })
}


exports.viewSingle = async function (req, res) {
    try {
        let post = await Post.findSingleById(req.params.id, req.visitorId);
        res.render('Single-post-screen', { post: post })
    } catch {
        res.render('404')
    }
}


exports.viewEditScreen = async function (req, res) {
    try {
        let post = await Post.findSingleById(req.params.id)
        if (post.authorId == req.visitorId) {
            res.render('edit-post', { post: post })
        } else {
            req.flash("errors", "you did not have permission to perform this action ")
            req.session.save(() => res.redirect("/"))
        }
    } catch {
        res.render("404")
    }

}

exports.edit = function (req, res) {
    let post = new Post(req.body, req.visitorId, req.params.id)
    post.update().then((status) => {
        // the post was successfully updated in the database
        // or user did have permission but there where validation errors 
        if (status == 'success') {
            // POST WAS UPDATED IN DB
            req.flash("success", "Post updated successfully")
            req.session.save(function () {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        } else {
            post.errors.forEach(function (error) {
                req.flash("errors", error)
            })
            req.session.save(function () {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }

    }).catch(() => {
        // a post with the reqquested id dosent exist
        // if the current vistor is not the owner of the requested post 
        req.flash('error', 'you do not have permission to edit')
        req.session.save(function () {
            res.redirect('/')
        })
    })
}