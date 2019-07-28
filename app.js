const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started at port '+port)
})