const express = require('express')
const authenticateToken = require("../middlewares/auth.middleware");
const { retrieveAllDocuments, retrieveMCQsInADocument } = require("../controllers/retrieve.controller");

const router = express.Router();

router.use('/allDocuments', authenticateToken, retrieveAllDocuments);

router.use('/MCQsInADocument', authenticateToken, retrieveMCQsInADocument);

module.exports = router;