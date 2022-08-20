const mongoose = require('mongoose')

const DreamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    isLucid: {
        yes: { type: Boolean, required: true, default: true },
        no: { type: Boolean, required: true, default: true }
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Dream', DreamSchema)