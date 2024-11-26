const fs = require('fs');
const pdf = require('pdf-parse');

const extractPdfText = filePath => {
    const pdfBuffer = fs.readFileSync(filePath);
    return pdf(pdfBuffer).then(data => {
        return data.text;
    })
}

module.exports = extractPdfText;