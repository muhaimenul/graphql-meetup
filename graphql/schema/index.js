const { buildSchema } = require('graphql')

buildSchema(`
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createAt: String!
    updatedAt: String!
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

input Booking {
    event: Event!
    user: User!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)