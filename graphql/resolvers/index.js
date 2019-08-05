const bcrypt = require('bcryptjs')

// models
const Event = require('../../models/event')
const User = require('../../models/user')
const Booking = require('../../models/booking')

//helpers
const { dateToString } = require('../../helpers/date')

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  }
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event)
  }
}

// binding relation

  module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event)
        });
      } catch (err) {
        throw err;
      }
    },
    
    createEvent: async args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5c0fbd06c816781c518e4f3e'
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById('5c0fbd06c816781c518e4f3e');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    
    createUser: async args => {
      try {
        const existingUser = await User.findOne({ email: args.userInput.email });
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
  
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
  
        const result = await user.save();
  
        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    },

    bookings: async () => {
      try {
        const bookings = await Booking.find()
        return bookings.map(booking => {
          return transformBooking(booking);
        });
      } catch (err) {
        throw err;
      }
    },

    bookEvent: async args => {
      const event = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: 'asdasdasdasdasd',
        event: event
      })
      const result = await booking.save()
      return transformBooking(result);
    },

    cancelBooking: async args => {
      try {
        const booking = await Booking.findOne({ _id: args.bookingId }).populate('event');
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId });
        return event;
      } catch (err) {
        throw err;
      }
    }
  };