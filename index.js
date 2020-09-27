var express = require('express'),
	app = express(),
	port = process.env.PORT || 4000;

var bodyParser = require('body-parser');
var todoRoutes = require('./routes/todos');
var techsectionRoutes = require('./routes/techsections');
var gurulinkRoutes = require('./routes/gurulinks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send({ message: 'Hi from root express' });
});

app.use('/api/todos', todoRoutes);
app.use('/api/ts', techsectionRoutes);
app.use('/api/gl', gurulinkRoutes);

// app.listen(process.env.PORT, )
app.listen(port, function() {
	console.log('APP is running on port ' + port);
});
