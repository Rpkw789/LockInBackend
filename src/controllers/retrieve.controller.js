const connectToDatabase = require("../database/mongodb.connection");
const { use } = require("../routes/upload.routes");

const retrieveAllDocuments = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const filter = { uid: `${req.user.uid}`};
    
        const userInfo = await collection.findOne(filter);
        const documents = userInfo.documents || [];
        res.json(documents);
    } catch (error) {
        console.log("Error fetching documents: ", error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

const retrieveMCQsInADocument = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("MCQs");
        const filter = {
            uid: `${req.user.uid}`,
            document: `${req.headers.document}`,
        };
    
        const MCQs = await collection.find(filter).toArray();
        res.json(MCQs);
    } catch (error) {
        console.log("Error fetching MCQs: ", error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

module.exports = { retrieveAllDocuments, retrieveMCQsInADocument };