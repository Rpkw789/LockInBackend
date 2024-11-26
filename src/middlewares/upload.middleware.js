const multer = require('multer');
const path = require('path');
const fs = require('fs');

// set up multer for storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "./uploads";
        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
})

// middleware config
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

module.exports = upload;