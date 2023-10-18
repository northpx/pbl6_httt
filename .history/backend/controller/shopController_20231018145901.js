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
    const {email, password}
})

module.exports = {createShop}