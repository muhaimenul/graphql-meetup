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
const events = [];
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {        
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
              };
              events.push(event);
              return event;
        }
    },
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