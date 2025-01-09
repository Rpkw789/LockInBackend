const uploadRouter = require("./routes/upload.routes");
const retrieveRouter = require("./routes/retrieve.routes");
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
// Loading Routes
app.use('/upload', uploadRouter);
app.use('/retrieve', retrieveRouter);
app.get('/', (res, req) => {
    console.log("received testing");
    req.send("hello");
});

// Operation
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`)
})