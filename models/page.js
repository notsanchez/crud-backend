const mongoose = require('mongoose')

const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        required: true
    },
    social: {
        type: String,
        default: ''
    },
    socialLink: {
        type: String,
        default: ''
    },
    social2: {
        type: String,
        default: ''
    },
    socialLink2: {
        type: String,
        default: ''
    },
    social3: {
        type: String,
        default: ''
    },
    socialLink3: {
        type: String,
        default: ''
    },
    social4: {
        type: String,
        default: ''
    },
    socialLink4: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page