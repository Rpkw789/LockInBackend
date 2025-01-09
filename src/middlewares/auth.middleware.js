const admin = require("../services/firebaseAdmin.service")

async function authenticateToken(req, res, next) {
    const idToken = req.headers.authorization;

    console.log("Authenticating Token...");
    
    if(!idToken) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        console.log("Token Authenticated for user " + decodedToken.uid);
        next();
    } catch (error) {
        res.status(403).json({message: "Forbidden", error: error.message});
    }
}

module.exports = authenticateToken;