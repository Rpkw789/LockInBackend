const admin = require("firebase-admin")

const serviceAccount = require("../../lockin-ea4bd-firebase-adminsdk-xa3al-d3400e27a0.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
