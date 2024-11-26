const express = require('express')
const authenticateToken = require("../middlewares/auth.middleware");
const connectToDatabase = require("../database/mongodb.connection");

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const db = await connectToDatabase();  // Get the shared database connection
        const collection = db.collection('users');
        const newUser = { name: 'John Doe', age: 30, city: 'New York' };
        const result = await collection.insertOne(newUser);
        console.log('User inserted:', result);
    } catch (error) {
        console.error('Error writing to MongoDB:', error);
    }
    res.send({message: "Test", user: req.user});
})

module.exports = router;