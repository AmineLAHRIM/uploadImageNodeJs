var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        extension = file.originalname.split('.').pop()
        console.log('extension', extension);
        cb(null, new Date().toISOString() + "-" + Math.round(Math.random() * 1E9) + "." + extension);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* Upload file. */
router.post("/", upload.single('file'), (req, res, next) => {
    const urlImage = req.file.path;
    console.log('urlImage', urlImage);
    res.status(201).json({
        imageUrl: 'https://' + req.headers.host + "/" + urlImage
    });
});


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('upload respond with a resource');
});

module.exports = router;
