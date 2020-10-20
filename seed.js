// TO import or export from mongodb, useful for backup
// Currently, import data from a json file into a mongodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/haiyandb-api', { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true });
var data = require('./techData.json');

mongoose.Promise = Promise;

const Techsection = require('./models/techsection');
const Gurulink = require('./models/gurulink'); 
const Message = require('./models/message'); 
const Todo = require('./models/todo'); 
const User = require('./models/user'); 
const { options } = require('./routes/auth');
const { exists } = require('./models/todo');

function seedDB() {
  Gurulink.remove()
  .then( () => {
    console.log('Removed all guru links!');
    return Techsection.remove();
  })
  .then( () => {
    console.log('Removed all tech sections!');

    data.forEach( (seed) => {
      const tstitle = {name: seed.title};
      let createdTS = null;
      Techsection.create(tstitle)
      .then( (ts) => {
        console.log('tech section created!');
        createdTS = ts;

        const gurulinks = seed.links.map( link => ( {"title": link.title, "url": link.url, "comment": link.comment}));
        console.log('prepare gurulinks ... ');
        console.log(gurulinks);

        return Gurulink.insertMany(gurulinks);
      })
      .then( (gurulinks) => {
        console.log('guru links created! ...');
        console.log(gurulinks);

        gurulinks.forEach( (item) => createdTS.links.push(item._id));

        return createdTS.save();
      })
      .catch( (error) => {
        console.error(error);
      })

    })
    .catch( (error) => {
      console.log('outer error ...');
      console.error(error);
    })
  })

}

seedDB();

// module.exports = seedDB; 

