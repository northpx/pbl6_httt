const asyncHandler = require('express-async-handler');
const Coupon = require('../model/Coupon');
const validateMongodbId = require('../utils/validateMongoDbId');

const createCoupon = asyncHandler(async (req, res) =>{
    const name = req.body.name;
    const findCoupon = await Coupon.findOne({name})
    if(!findCoupon){
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    }
    else{
        throw new Error("Coupon already exists!")
    }
})

const getAllCouponFromShop = asyncHandler(async (req, res) =>{
    const { _id } = req.seller;
    validateMongodbId(_id)
    try {
        const coupons = await Coupon.find({shopId: _id})
        res.json({coupons})
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        
    } catch (error) {
        throw new Error('Coupon code does not exi')
    }
})

module.exports = {createCoupon, getAllCouponFromShop}