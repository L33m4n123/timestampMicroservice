var express = require('express');
var moment = require('moment');
var app = express();

var months = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];

app.set('port', (process.env.PORT || 5000));

app.all("*", (req, res) => {
	var test = decodeURIComponent(req.originalUrl.replace('/', ''));
	var date;
	if (Number(test)) {
		var mom = moment.unix(test);
		date = mom.toDate();
		date.setHours(date.getHours() - 1);
	} else {
		date = new Date(test)
	}
	var dateString = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	if (dateString.startsWith("undefined"))
		dateString = null;
	var unixTime = date.getTime()/1000 + 3600;
	res.send(JSON.stringify({'unixtime': unixTime, "natural": dateString}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


