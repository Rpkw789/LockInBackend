require("dotenv").config();
const { OpenAI } = require('openai');

let openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

const queryOpenAi = async text => {
    const prompt = `
    Based on the following text, generate 3 multiple-choice questions (MCQs) with 4 options each, and indicate the correct answer. Format the response as a JSON array of objects, like this:
    [
      {
        "question": "Question 1?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Option A"
      },
      ...
    ]

    Text:
    ${text}
  `;

    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: 'gpt-4',
    });

    return JSON.parse(response.choices[0].message.content);
}

module.exports = queryOpenAi;
