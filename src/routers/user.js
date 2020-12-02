const express = require('express')
const { update } = require('../models/user')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//SIGN UP
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.authTokenGenerator()

        res.status(201).send({user, token})
    } catch(err) {
        res.status(400).send(err)
    }
})
//LOGIN
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.authTokenGenerator()

        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
})
//LOGOUT
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})
//LOGOUT ALL
router.post('/users/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})
//READ PROFILE
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users', auth, async (req, res) => {
//     try {
//         const users = await User.find({}) 
//         res.send(users)
//     } catch(err) {
//         res.status(500).send()
//     }
// })
//READ ONE
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
        
//     } catch {
//         res.status(500).send()
//     }
// })
//UPDATE
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'password', 'name', 'age']
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!validUpdate) {
        return res.status(400).send({error: 'Not a valid property to update!'})
    }

    try {
        //const user = await User.findById(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})
//DELETE
router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router