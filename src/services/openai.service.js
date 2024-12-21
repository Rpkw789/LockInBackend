require("dotenv").config();
const { OpenAI } = require('openai');

let openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

const queryOpenAi = async text => {
    const response = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a helpful assistant.'},
            {role: 'user', content: `Here is the text extracted from a PDF: ${text}`},
            {role: 'user', content: 'Read the text and generate 5 Multiple Choice Questions in json format (as a list of objects) with the following variables 1. question 2. choice1 3. choice2 4. choice3 5. choice4 6. answer   "answer" is an integer from range 1 to 4, representing which choice is correct'}
        ],
        model: 'gpt-4',
    });

    return response.choices[0].message.content;
}

module.exports = queryOpenAi;
