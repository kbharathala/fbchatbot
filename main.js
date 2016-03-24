'use strict';
var bot = require('./bot');
const _ = require('underscore');
const fs = require('fs')
const path = require('path')

var commandsPath = path.join(__dirname, 'commands');

var commandsFiles = fs.readdirSync(commandsPath); 
commandsFiles.forEach( function(filename) {
		let fileparts = filename.split('.'); 
		let type = fileparts[fileparts.length -1];
		if(type === "js"){
			let command = require("./commands/" + filename);
			if(command.command && _.isFunction(command.handler)){
				bot.addCommand(command.command, command.handler);
			}
		}

	});

 