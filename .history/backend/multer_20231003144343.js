const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, res, cb){
        const uniqueSuffix = Date.now() + ""
    }
})