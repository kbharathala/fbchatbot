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

module.exports.usage = '<command, zipcode, cuisine>';
module.exports.description = '';

module.exports.handler = (api, args, message) => {

  if(args.length <= 1) {
  	api.sendMessage("<command, zipcode, cuisine>", message.threadID);
  } else if(args.length == 2) {
      yelp.search({ term: 'food', location: args[0], sort: 2 })
      .then(function (data) {
        let restaurants = [];
        for(var i = 0; i < data.businesses.length; i++) {
          restaurants.push(data.businesses[i].name);
        }
        if(args[0] == 'search') {
          api.sendMessage(restaurants.slice(0,10).join(", "), message.threadID);
        } else if(args[0] == 'random') {
          var randomInt = Math.floor(Math.random()*10);
          api.sendMessage(restaurants[randomInt], message.threadID);
        } else {
          api.sendMessage('Invalid command', message.threadID);
        }
      })
      .catch(function (err) {
        console.log(err);
        api.sendMessage("Sorry. There are no results for that entry", message.threadID);
      });
  } else {
  	let cmd = args[0];
    let zip = args[1];
  	args.shift();
    args.shift();
  	let cuisine = args.join(' ');
  	yelp.search({ term: cuisine, location: zip, sort: 2 })
      .then(function (data) {
        let restaurants = [];
        for(var i = 0; i < data.businesses.length; i++) {
          restaurants.push(data.businesses[i].name);
        }
        if(cmd == 'search') {
          api.sendMessage(restaurants.slice(0,10).join(", "), message.threadID);
        } else if(cmd == 'random') {
          var randomInt = Math.floor(Math.random()*10);
          api.sendMessage(restaurants[randomInt], message.threadID);
        } else {
          api.sendMessage('Invalid command', message.threadID);
        }
      })
      .catch(function (err) {
        console.log(err);
        api.sendMessage("Sorry. There are no results for that entry", message.threadID);
      });
  }
};


