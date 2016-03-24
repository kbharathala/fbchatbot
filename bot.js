var login = require("facebook-chat-api");

// Create simple echo bot
login({email: "jarcortana@gmail.com", password: "cortanaJ"}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        api.sendMessage(message.body, message.threadID);
        api.getFriendsList(function(err, data) {
			if(err) return console.error(err);
			api.sendMessage(data[1].profileUrl, message.threadID);
		});
    });


});