'use strict'


var request = require('request');
const fs = require('fs');

module.exports.command = 'imugr';
module.exports.usage = '<test>';
module.exports.description = '';
var client_secret = ' b58225eb9fa856f98e70b7008c2d453345263d94';

module.exports.handler = (api, args, message) =>{
	request({
	  url: 'https://api.imgur.com/3/image/1',
	  method: 'GET',
	  headers:{ Authorization: 'Client-ID 5e2dc40e95a2697'}
	}, function(err, res) {
	  if(err){
	  	console.log('hello');
	  }
	  var link = JSON.parse(res.body)['data']['link'];
	  console.log(link);
	  api.sendMessage(String(link), message.threadID);
	});
}