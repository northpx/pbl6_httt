const asyncHandler = require("express-async-handler")
const Shop = require('../model/Shop')
const { generateRefreshToken } = require('../utils/refreshToken');
const { generateToken } = require('../utils/jwtToken');
const validateMongodbId = require("../utils/validateMongoDbId");

const createShop = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findShop = await Shop.findOne({email});
    if(!findShop){
        const newShop = await Shop.create(req.body)
        res.json(newShop)
    }
    else{
        throw new Error("Shop already exists!")
    }
});

const loginShop = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const findShop = await Shop.findOne({email}).select("+password");
    if(findShop.role !== "Seller") throw new Error("Not authorised!")
    if(findShop && (await findShop.comparePassword(password))){
        const refreshToken = await generateRefreshToken(findShop?._id);
        const updateshop = await Shop.findByIdAndUpdate(findShop.id, {
            refreshToken : refreshToken
        }, {new: true}) 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            _id: findShop?._id,
            name: findShop?.name,
            email: findShop?.email,
            address: findShop?.address,
            zipcode: findShop?.zipCode,
            token: generateToken(findShop?._id),
        })
    }
    else{
        throw new Error("Invalid Credentials")
    }
})

const updatePassword = asyncHandler(async (req, res) =>{
    const { _id } = req.user;
    const {password} = req.body;
    validateMongodbId(_id);
    const shop = await Shop.findById(_id);
    if(password){
        shop.password = password;
        const updatedPassword = await shop.save()
        res.json()
    }

})

module.exports = {createShop, loginShop, updatePassword}