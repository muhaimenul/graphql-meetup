const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

// jwt middleware
const isAuth = require('./middleware/is-auth');

const app = express()

app.use(isAuth)

const { username, password, host, dbname, dbengine } = require('./utils/config');
// env variable can be define from nodemon.json or using dot-env package
// console.log(process.env.KING_USER)

const mongoUri =  dbengine + '://' +  username + ':' +  password + '@' +  host + '/' +  dbname;
// mongoose.Promise = global.Promise //for deprication warning
mongoose.connect(mongoUri, { useNewUrlParser: true })
  .then(() =>  console.log('MLab connection succesful'))
  .catch((err) => console.error(err))


app.use(morgan('dev'))
app.use(express.json())

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
})
);

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started at port '+port)
})