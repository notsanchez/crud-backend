const express = require('express')
const { MongoDBNamespace } = require('mongodb')
const { default: mongoose } = require('mongoose')
const { db } = require('./models/page')
const app = express()
require('./db/mongoose')
const Page = require('./models/page')

const PORT = process.env.PORT || 3000
app.use(express.json())

app.post('/page', async (req, res) => {
    const page = new Page({
        ...req.body
    })

    try{
        await page.save()
        res.status(201).send(page)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/page', async (req, res) => {
    try{
        const page = await Page.find()
        if(!page) return res.status(404).send()

        res.send(page)
    } catch(e){
        res.status(500).send(e)
    }
})

app.get('/page/:name', async (req, res) => {
    try{
        const page = await Page.findOne({name: req.params.name})
        if(!page) return res.status(404).send()

        res.send(page)
    } catch(e){
        res.status(500).send(e)
    }
})

app.patch('/page/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'title', 
        'imageURL', 
        'body', 
        'social', 
        'socialLink', 
        'social2', 
        'socialLink2', 
        'social3', 
        'socialLink3', 
        'social4', 
        'socialLink4'
    ]
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid) return res.status(400).send({errors: 'Invalid update keys'})

    try{
        const page = await Page.findOne({_id: req.params.id})
        if(!page) return res.status(404).send()
        updates.forEach((update) => page[update] = req.body[update])

        await page.save()
        res.send(page)
    } catch(e){
        res.status(400).send(e)
    }
})

app.delete('/page/:id', async (req, res) => {
    try{
        const page = await Page.findOneAndDelete({_id: req.params.id})
        if(!page) return res.status(404).send()

        res.send(page)
    } catch(e){
        res.status(500).send(e)
    }
})

app.listen(PORT, () => {
    console.log('Listening to ' + PORT)
})