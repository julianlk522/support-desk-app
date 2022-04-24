const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const { restart } = require('nodemon')

//  Get user tickets
//  Route: GET /api/tickets
//  Private Access
const getTickets = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})
    
    res.status(200).json(tickets)
})

//  Get user ticket
//  Route: GET /api/tickets/:id
//  Private Access
const getTicket = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    
    res.status(200).json(ticket)
})

//  Create new ticket
//  Route: POST /api/tickets
//  Private Access
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }
    
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    
    res.status(201).json(ticket)
})

//  Delete ticket
//  Route: DELETE /api/tickets/:id
//  Private Access
const deleteTicket = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    
    await ticket.remove()
    
    res.status(200).json({success: true})
})

//  Update ticket
//  Route: PUT /api/tickets/:id
//  Private Access
const updateTicket = asyncHandler(async (req, res) => {
    //  Get user with id from JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}