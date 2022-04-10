const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")

// @desc    Register a user
// @route   POST /api/users/
// @access  Public
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
        res.json({message: "Please add all fields"})
        return
        // throw new Error("Please add all fields")
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.json({message: "User already exists"})
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        })
    } else {
        res.json("Invalid user data or user failed to create")
    }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    res.json({message: "Login User"})
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.json({message: "Seeing user data"})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}