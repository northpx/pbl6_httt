const asyncHandler = require("express-async-handler")
const User = require('../model/User')
const { generateRefreshToken } = require('../utils/refreshToken');
const { generateToken } = require('../utils/jwtToken');
const validateMongodbId = require("../utils/validateMongoDbId");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    else {
        throw new Error('User Already Exists!')
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // console.log({email, password})
    const findUser = await User.findOne({ email }).select("+password");
    if (findUser && (await findUser.comparePassword(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken,
        }, {
            new: true,
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        })
    }
    else {
        throw new Error('Invalid Credentials')
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const getuser = await User.findById(id);
        res.json({
            getuser
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            name: req.body?.name,
            email: req.body?.email,
            mobile: req.body?.mobile
        }, {new : true})
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deluser = await User.findByIdAndDelete(id)
        res.json({
            deluser
        })
    } catch (error) {
        throw new Error(error)
    }
})






module.exports = {createUser, loginUser, getUserById, getAllUser, updateUser, deleteUser}