const asyncHandler = require('express-async-handler')

//  Register a new user
//  Route: /api/users
//  Public Access
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
        res.send('Register Route')
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