const bcrypt = require('bcryptjs')

// models
const Event = require('../models/event')
const User = require('../models/user')

module.exports = {
    events: () => {
        //populate('creator') is with('relation') of mongoose
        return Event.find().populate('creator')
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
        User.findOne({email: args.userInput.email})
        .then(user => {
            if (user) {
                throw new Error('User Exist already.')
            }
            return bcrypt.hash(args.userInput.password, 12)
        }).then(
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
}