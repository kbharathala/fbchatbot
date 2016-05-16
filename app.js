var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// Verify
app.get('/8079db897316c96776099e73bf49061f696e56b54a21fd4294', function (req, res) {
  if(req.query['hub.verify_token'] == "34-31-0"){
  	res.send(req.query['hub.challenge']);
  }
  else{
  	res.send('Invalid Verification Token');
  }
});



app.post('/8079db897316c96776099e73bf49061f696e56b54a21fd4294', function (req, res) {
  console.log('HEY');
});


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});



