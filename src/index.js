const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('<h1>Hi Haiyan</h1>');
});

app.listen(3001, () => {
	console.log('Haiyan listening on port 3001');
});
