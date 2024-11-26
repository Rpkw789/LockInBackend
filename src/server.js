const admin = require("./routes/admin");

const express = require('express')
const app = express()
const port = 3000

// Loading Routes
app.use('/admin', admin);

// Operation
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})