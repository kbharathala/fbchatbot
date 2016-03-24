'use strict';
const facebook = require('facebook-chat-api');
const _ = require('underscore');

module.exports.name = 'wrapper'; 

module.exports.information = function() { console.log('API Wrapper')}; 

module.exports.addPerson = function(api, name, threadID){
	api.getUserID(name, function(err, data){
		if(err) return console.error(err);
		console.log(data);
		let ID = data[0].userID; 
		api.addUserToGroup(ID, threadID, (err) => {return console.error(err)});
	});
}

module.exports.getPersonData = function(api, name){
	api.getUserID(name, function(err, data){
		if(err) return console.error(err);
		return data;
	});
}