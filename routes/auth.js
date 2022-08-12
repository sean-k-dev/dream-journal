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


module.exports = router