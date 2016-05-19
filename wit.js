
const Wit = require('node-wit').Wit;
var config = require('./config');
var app = require('./app.js');
var token = config.wit_token;
var yelp = require('./commands/yelp.js');


const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};


const actions = {
	say(sessionId, context, message, cb) {
	    app.send(app.sessions[sessionId].fbid, message);
	    console.log('message sent!');
	    cb();
	},
	merge(sessionId, context, entities, message, cb) {
		const loc = firstEntityValue(entities, 'location');
		const query = firstEntityValue(entities, 'local_search_query');
		console.log(loc);
		console.log(query);
		if(loc && query){
			context.loc = loc;
			context.query = query;
		}
	    cb(context);
	},
	yelp(sessionId, context, cb){
		context.suggestions = yelp.wit(context['query'], context['loc'], context, cb);
	},
	error(sessionId, context, error) {
		console.log(context);
	    console.log(error.message);
	}
}
const wit = new Wit(token, actions);

module.exports.wit = wit; 