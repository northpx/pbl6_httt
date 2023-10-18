const asyncHandler = require('express-async-handler');
const Coupon = require('../model/Coupon');

const createCoupon = asyncHandler(async (req, res) =>{
    const name = req.body.name;
    const findCoupon = await Coupon.findOne({name})
    if(!findCoupon){
        const newCoupon = 
    }
})

module.exports = {createCoupon}