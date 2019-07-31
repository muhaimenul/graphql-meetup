const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const app = express()

// models
const Event = require('./models/event')
const User = require('./models/user')

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
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then(events => {
                return events.map(event => {
                    return { ...event._doc }
                    // sometimes _id is not recognized. So, _id:event._doc._id.toString() or _id:event.id
                })
            })
            .catch(err => { throw err });        
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)                
            })
            return event.save()
            .then(res => {
                console.log(res)
                return {...res._doc}
            })
            .catch(err => {
                console.log(err)
                throw err;
            })
        },
        createUser: (args) => {
            User.findOne({email: args.userInput.email}).then().catch()
            return bcrypt.hash(args.userInput.password, 12).then(
                hashedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword                
                    })
                    return user.save()
                        .then(res => {
                            console.log(res)
                            return {...res._doc, password: null}
                        })
                        .catch(err => {
                            console.log(err)
                            throw err;
                        })        
                }
            ).catch(
                err => {
                    throw err;
                }
            )
            
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