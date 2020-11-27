const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()

//CREATE
router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    })
    try{
        await book.save()
        res.status(201).send(book)
    } catch(err){
        res.status(400).send(err)
    }
})
//READ ALL
router.get('/books', async (req, res) => {
    try{
        const books = await Book.find({})
        const str = {}
        books.forEach((book, i) => {
            str[i+1]= {
                id: book._id,
                title: book.title,
                author: book.author
            }
        })
        res.send(str)
    } catch(err) {
        res.status(500).send()
    }
})
//READ ONE
router.get('/books/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findById(_id)
        if(!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch {
        res.status(500).send()
    }
})
//UPDATE
router.patch('/books/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['isbn', 'title', 'author', 'description', 'published']
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!validUpdate) {
        return res.status(400).send({error: 'Not a valid property to update!'})
    }

    try {
        const book = await Book.findOne({_id: req.params.id, owner: req.user._id})
        if(!book) {
            return res.status(404).send()
        }
        updates.forEach((update) => book[updates] = req.body[update])
        await book.save()
        res.send(book)
    } catch(e) {
        res.status(400).send(e)
    }
})
//DELETE
router.delete('/books/:id', auth, async (req, res) => {
    try{
        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if(!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router