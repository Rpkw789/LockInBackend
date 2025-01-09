const admin = require("firebase-admin")

const serviceAccount = require("../../lockin-ea4bd-firebase-adminsdk-xa3al-202e3b1b0d.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
