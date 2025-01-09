const express = require('express')
const authenticateToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const uploadAndGenerateMCQs = require("../controllers/generate.controller");

const router = express.Router();

router.use('/', upload.single('file'), authenticateToken, uploadAndGenerateMCQs);

module.exports = router;