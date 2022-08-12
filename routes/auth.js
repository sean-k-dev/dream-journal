const express = require('express')
const passport = require('passport')
const router = express.Router()

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Google Authentication Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect:
'/' }), (req, res) => {
    res.redirect('/dashboard')
})

// Logout User
router.get('/logout', (req, res, next) => {
    req.logout( (err) => {
        if(err){return next(err)}
        res.redirect('/')
    } )
})

module.exports = router