const express = require('express')
const Poll = require('../models/Poll')
const User = require('../models/User')
const router = express.Router()

// Create poll
router.post('/create', async (req, res) => {
    const { question, options } = req.body

    if (!question || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ error: 'Poll must have a question and at least 2 options' })
    }

    try {
        const poll = new Poll({
            question,
            options: options.map(text => ({ text, votes: 0 }))
        })
        await poll.save()
        res.status(201).json({ poll })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating poll' })
    }
})

// Get all polls
router.get('/', async (req, res) => {
    try {
        const polls = await Poll.find()
        res.status(200).json(polls)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching polls' })
    }
})

// Get specific poll by ID
router.get('/:id', async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id)
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' })
        }
        res.status(200).json(poll)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching poll' })
    }
})

// Vote on a poll
router.post('/:id/vote', async (req, res) => {
    const { userId, optionIndex } = req.body

    if (optionIndex === undefined) {
        return res.status(400).json({ error: 'Option index is required' })
    }

    try {
        const poll = await Poll.findById(req.params.id)
        const user = await User.findById(userId)

        if (!poll || !user) {
            return res.status(404).json({ error: 'Poll or User not found' })
        }

        if (user.votedPolls.includes(poll._id)) {
            return res.status(400).json({ message: 'User has already voted on this poll' })
        }

        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            return res.status(400).json({ error: 'Invalid option index' })
        }

        poll.options[optionIndex].votes += 1
        await poll.save()

        user.votedPolls.push(poll._id)
        await user.save()

        res.status(200).json({ message: 'Vote recorded successfully' })
    } catch (error) {
        console.error('Error voting:', error)
        res.status(500).json({ error: 'Error recording vote' })
    }
})

module.exports = router
