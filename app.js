var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 
var app = express();
var config = require('./config');
var token = config.token;
var verify = config.verify;
var commands = [];
var waterfall = require('async-waterfall');
const _ = require("underscore");
const fs = require('fs');
const path = require('path')


app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Add Commands 
var commandsPath = path.join(__dirname, 'commands');
var commandsFiles = fs.readdirSync(commandsPath); 
commandsFiles.forEach( function(filename) {
		var fileparts = filename.split('.'); 
		var type = fileparts[fileparts.length -1];
		if(type === "js"){
			var command = require("./commands/" + filename);
			if(command.command && _.isFunction(command.handler)){
				commands.push({cmd: command.command, handler: command.handler});
			}	
		}

});

function handleCommand (event, callback){
	var text = event.message.text;
	var args = text.substring(1).split(' '); 
	var valid = false;
	if(text.charAt(0) === '/' ){
		_.each(commands, (command) => {
				if(command.cmd.toLowerCase() === args[0].toLowerCase()) {
					valid = true;
					response = command.handler(event, callback);
				}
		});
		if(!valid) {
          		sendText(event, 'Unknown Command');
        }
	}
	else{
		console.log('invalid');
		sendText(event, 'Unknown Command');
	}
}

var sendText = function (event, response){
	var sender = event.sender.id;
	messageData = {
        text:response
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}; 


// Verify
app.get('/8079db897316c96776099e73bf49061f696e56b54a21fd4294', function (req, res) {
  if(req.query['hub.verify_token'] == verify){
  	res.send(req.query['hub.challenge']);
  }
  else{
  	res.send('Invalid Verification Token');
  }
});


// Receive Messages
app.post('/8079db897316c96776099e73bf49061f696e56b54a21fd4294', function (req, res) {
	messaging_events = req.body.entry[0].messaging;
	for(i = 0; i < messaging_events.length; i++){
		var event = messaging_events[i];
		var sender = event.sender.id; 
		if(event.message && event.message.text){
			console.log(event.message.text);
			handleCommand(event, sendText);
		}
	}
	res.sendStatus(200);
});



app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});
	


