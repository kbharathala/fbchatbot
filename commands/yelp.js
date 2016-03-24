'use strict';

const Yelp = require('yelp');
const _ = require('underscore');

var yelp = new Yelp({
  consumer_key: '-Kz-oJQA9ckr6Bml2B_m-Q',
  consumer_secret: 'mlmMZA_BeyXY2jOakh_mfgkkV9Y',
  token: 'DFJVjfItJeFk361bhaarPdFz7qLsM2_d',
  token_secret: 'i55norVbJcTb9HBHVw1nDDtL6o4',
});

module.exports.command = 'yelp';

module.exports.usage = '<zipcode, cuisine>';
module.exports.description = 'gets food in the area by zipcode. default: food';

module.exports.handler = (api, args, message) => {

  if(args.length < 1) {
  	api.sendMessage("What's your zipcode?", message.threadID);
  } else if(args.length == 1) {
    	yelp.search({ term: 'food', location: args[0] })
  	.then(function (data) {
      api.sendMessage(data.businesses[0].name, message.threadID);
  	})
  	.catch(function (err) {
  	  api.sendMessage("Sorry. There are no results for that entry", message.threadID);
  	});
  } else {
  	let zip = args[0];
  	args.shift()
  	let cuisine = args.join(' ');
  	yelp.search({ term: cuisine, location: zip})
  	.then(function (data) {
      api.sendMessage(data.businesses[0].name, message.threadID);
  	})
  	.catch(function (err) {
  	  api.sendMessage("Sorry. There are no results for that entry", message.threadID);
  	});
  }
};


