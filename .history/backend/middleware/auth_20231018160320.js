const User = require('../model/User')
const Shop = require('../model/Shop')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req,res,next) =>{
    let token;
    if(req.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
                // console.log(decoded)
                const user = await User.findById(decoded?.id)
                const seller = await Shop.findById(decoded?.id)
                req.user = user;
                req.seller = seller;
                next();
            }
        } catch (error) {
            throw new Error('Not Authorized token expired, please login again')
        }
    }
    else{
        throw new Error('There is no token attached to header')
    }
})

const isAdmin = asyncHandler(async (req, res, next) =>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error('You are not an admin')
    }
    else{
        next()
    }
})

const isSeller = asyncHandler(async (req,res, next) =>{
    const {email} = req.seller;
    const shopUser = await Shop.findOne({email})
    if(shopUser.role !== "Seller"){
        throw new Error("You are not a seller")
    }
    else{
        next()
    }
})

module.exports = {authMiddleware, isAdmin, isSeller};