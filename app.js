const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()


const { username, password, host, dbname, dbengine } = require('./utils/config');
const mongoUri =  dbengine + '://' +  username + ':' +  password + '@' +  host + '/' +  dbname;

app.use(morgan('dev'))
app.use(express.json())
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        schema {
            query:
            mutation:
        }
    `),
    rootValue: {}
}));

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started at port '+port)
})