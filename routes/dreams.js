const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Dream = require('../models/Dream')

router.get('/add', ensureAuth, (req, res) => {
    res.render('dreams/add')
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Dream.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router