const admin = require("./routes/admin.routes");
const express = require('express')
const app = express()
const port = 3000

// Loading Routes
app.use('/admin', admin);

// Operation
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})