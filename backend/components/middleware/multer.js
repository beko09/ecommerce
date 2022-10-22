const multer = require('multer')

const DIR = 'uploads'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname.toLowerCase().split(' ').join('-')
        cb(null, fileName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
        {
            cb(null, true)
        } else
        {
            cb(null, false)
            return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
        }
    }
})

module.exports = upload
