const Event = require('../../models/event');
const {dateToString}  = require ("../helpers/date.js") 
const {transformEvent}= require('./merge')



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
    createEvent: async (args,req) => {
      if(!req.isAuth){
        throw new Error('Unauthenticatd');
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5f1ba64ee48a9e017c055221'
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result)
        const creator = await User.findById('5f1ba64ee48a9e017c055221');
  
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
    }
    
  };