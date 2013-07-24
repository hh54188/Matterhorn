var express = require('express')
var app = express();

app.configure(function () {
	app.use(express.static(__dirname));
})

app.get('/test', function (req, res) {
	res.redirect('/js/test/SpecRunner.html');
})

app.listen(8000);