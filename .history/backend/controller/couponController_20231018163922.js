const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res) =>{
    const name = req.body.name;
    const findCoupon = 
})

module.exports = {createCoupon}