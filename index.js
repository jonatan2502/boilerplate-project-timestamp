// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/:date?', function (req, res) {
	let { date } = req.params;
	if (!date) {
		let date = new Date();
		let unix = date.getTime() / 1000;
		return res.json({
			unix,
			utc: date,
		});
	} else if (!date.includes('-')) {
		let unix = parseInt(req.params.date) * 1000;
		let date = new Date(unix);
		return res.json({
			unix,
			utc: date,
		});
	} else {
		let date = new Date(req.params.date);
		let unix = date.getTime() / 1000;
		return res.json({
			unix,
			utc: date,
		});
	}
});

// listen for requests :)
// var listener = app.listen(3001, function () {
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
