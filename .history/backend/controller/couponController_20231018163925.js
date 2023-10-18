const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res) =>{
    const name = req.body.name;
    const findCoupon = await 
})

module.exports = {createCoupon}