const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Dream = require('../models/Dream')

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const dreams = await Dream.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            dreams
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router