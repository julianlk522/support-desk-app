const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//  Register a new user
//  Route: /api/users
//  Public Access
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    
    //  Determine if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //  Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //  Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//  Login a user
//  Route: /api/users/login
//  Public Access
const loginUser = asyncHandler(async () => {
    res.send('Login Route')
})

module.exports = {
    registerUser, 
    loginUser
}