const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started at port '+port)
})