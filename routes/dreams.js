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

router.get('/', ensureAuth, async (req, res) => {
    try {
        const dreams = await Dream.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()

        res.render('dreams/index', {
            dreams,
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let dream = await Dream.findById(req.params.id)
            .populate('user')
            .lean()

        if (!dream) {
            return res.render('error/404')
        }

        res.render('dreams/show', {
            dream
        })
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})


router.get('/edit/:id', ensureAuth, async(req, res) => {
    const dream = await Dream.findOne({
        _id: req.params.id
    }).lean()

    if (!dream) {
        return res.render('error/404')
    }

    if (dream.user != req.user.id) {
        res.redirect('/dreams')
    } else {
        res.render('dreams/edit', {
            dream
        })
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    
    try {
        let dream = await Dream.findById(req.params.id).lean()

        if (!dream) {
        return res.render('error/404')
    } else {
        dream = await Dream.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        res.redirect('/dashboard')
    }
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Dream.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})


router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const dreams = await Dream.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('dreams/index', {
            dreams
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router