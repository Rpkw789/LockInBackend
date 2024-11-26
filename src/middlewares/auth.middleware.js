const admin = require("../services/firebaseAdmin.service")

async function authenticateToken(req, res, next) {
    const authInput = req.headers.authorization;
    
    if(!authInput || !authInput.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const idToken = authInput.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).json({message: "Forbidden", error: error.message});
    }
}

module.exports = authenticateToken;