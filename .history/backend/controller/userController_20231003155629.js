const asyncHandler = require("express-async-handler")
const User = require('../model/User')

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

const editUser = asyncHandler(async (req, res) =>{

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // console.log({email, password})
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
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
            name: findUser?.firstname,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        })
    }
    else {
        throw new Error('Invalid Credentials')
    }
});



module.exports = {createUser, loginUser}