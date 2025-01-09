const extractPdfText = require("../utils/extractText.util");
const queryOpenAi = require("../services/openai.service");
const connectToDatabase = require("../database/mongodb.connection");
const deleteFile = require("../utils/deleteFile.util");

const uploadAndGenerateMCQs = async (req, res) => {
    console.log("Upload Request Received");
    const filePath = req.file.path;
    const questions = await getResponseOpenAi(filePath);
    if(Array.isArray(questions)) {
        storeInDatabase(questions, req);
        deleteFile(filePath);
        res.status(200).send({message: "MCQs generated and stored successfully!"});
    } else {
        res.status(500).send({error: "Failed to generate and store MCQs"});
    }
    
}

const storeInDatabase = async (questions, req) => {
    const db = await connectToDatabase();  // Get the shared database connection
    const collection = db.collection('MCQs');
    const formattedQuestions = questions.map(question => {
        return {
            ...question,
            uid: req.user.uid,
            document: req.file.filename
        }
    });
    await collection.insertMany(formattedQuestions);
    console.log("MCQs uploaded");

    const userCollection = db.collection('users');
    const filter = { uid: `${req.user.uid}`};
    const update = {
        $push: {documents: `${req.file.filename}`}
    };

    await userCollection.updateOne(filter, update, { upsert: true});
    console.log("Document ID uploaded");
}

const getResponseOpenAi = async filePath => {
    const text = await extractPdfText(filePath);
    const stringResponse = await queryOpenAi(text);
    console.log("OpenAI response: " + stringResponse);
    const questions = parseString(stringResponse);
    console.log("Questions:");
    console.log(questions);
    return questions;
}

const parseString = stringResponse => {
    try {
        const jsonObject = JSON.parse(stringResponse);
        return jsonObject;
    } catch (error) {
        try {
            const regex = /```json([\s\S]*?)```/;
            const match = stringResponse.match(regex);
            if (match) {
                const response = match[1].trim();
                const jsonObject = JSON.parse(response);
                return jsonObject;
            } else {
                return null;
            }
        } catch (error2) {
            console.log("Invalid JSON format: " + error2);
        }
    }
}

module.exports = uploadAndGenerateMCQs;