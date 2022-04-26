const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')
const { restart } = require('nodemon')

//  Get notes for a ticket
//  Route: GET /api/tickets/:ticketId/notes
//  Private Access
const getNotes = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const notes = await Note.find({ticket: req.params.ticketId})
    
    res.status(200).json(notes)
})

//  Create ticket note
//  Route: POST /api/tickets/:ticketId/notes
//  Private Access
const addNote = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const note = await Note.create({
        user: req.user.id,
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
    })
    
    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote,
}