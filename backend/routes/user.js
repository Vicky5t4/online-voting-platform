const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        const user = new User({ username, email, password })
        await user.save()

        const token = jwt.sign({ id: user._id }, JWT_SECRET)
        res.status(201).json({ token, user: { id: user._id, username, email } })
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1w' })

        res.json({
            token,
            userId: user._id,
            username: user.username
        })
    } catch (error) {
        console.error('Login error', error)
        res.status(500).json({ msg: 'Login failed' })
    }
})

module.exports = router
