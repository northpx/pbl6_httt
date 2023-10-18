const asyncHandler = require('express-async-handler');
const Coupon = require('../model/Coupon');

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
    const coupons = await Coupon.fin
})

module.exports = {createCoupon}