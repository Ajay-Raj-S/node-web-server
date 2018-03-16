const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Logging Middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req,res,next) => {
	res.render('maintainence', {
		pageTitle: 'under Maintainence! sorry'
	});
});

// express static middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to the new server'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage: 'Unable to fulfill this request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});