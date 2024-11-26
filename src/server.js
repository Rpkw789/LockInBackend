const uploadRouter = require("./routes/upload.routes");
const retrieveRouter = require("./routes/retrieve.routes");
const express = require('express')
const app = express()
const port = 3000

// Loading Routes
app.use('/upload', uploadRouter);
app.use('/retrieve', retrieveRouter);

// Operation
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})