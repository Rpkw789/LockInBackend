const express = require('express')
const authenticateToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
    res.send({message: "Test", user: req.user});
})

module.exports = router;