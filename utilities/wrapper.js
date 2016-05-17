'use strict';
const facebook = require('facebook-chat-api');
const _ = require('underscore');

module.exports.name = 'wrapper'; 

module.exports.information = function() { console.log('API Wrapper')}; 

module.exports.addPerson = function(api, name, threadID){
	api.getUserID(name, function(err, data){
		if(err) return console.error(err);
		let ID = data[0].userID; 
		api.addUserToGroup(ID, threadID, (err) => {return console.error(err)});
	});
}

module.exports.removePerson = function(api, name, threadID){
	api.getUserID(name, function(err, data){
		if(err) return console.error(err);
		let ID = data[0].userID; 
		api.removeUserFromGroup(ID, threadID, (err) => {return console.error(err)});
	});
}

module.exports.getPersonData = function(api, name, callback){
	api.getUserID(name, function(err, data){
		if(err) return console.error(err);
		callback(api, data);
	});
}