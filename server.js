var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('./lib/mysql.js');
var check = require('./validator');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({	extended: true }));

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {

	res.redirect('/home');

}).get('/home', function(req, res) {

	mysql.listUsers(function(rows) {
		res.render('home.ejs', {'data': rows});
});

}).get('/edit/:id', function(req, res) {

	mysql.selectUsers(req.params.id, function(rows) {
		
		res.render('edit.ejs', {id: rows[0].id, prenom: rows[0].prenom, nom: rows[0].nom, age: rows[0].age, email: rows[0].email});
});

}).post('/update', function(req, res) {

		email = req.body.email,
		prenom = req.body.prenom,
		nom = req.body.nom,
		age = req.body.age;
		id = req.body.id;

		if (prenom.length < 50) {
			if (nom.length < 50) {
				if (age < 5 && age > 100) {
					res.write("Vous devez avoir entre 5 et 100 ans");
				} 	else {
						mysql.editUser(req.body);
						res.redirect('/home');
					}
			} 	else {
					res.write("Votre nom doit contenir maximum 50 caractères");
				}
		} 	else {
				res.write("Votre prenom doit contenir maximum 50 caractères");
			} 

}).get('/delete/:id', function(req, res) {

	mysql.deleteUser(req.params.id);
    res.redirect('/home');

}).post('/subscribe', function(req, res) {

	email = req.body.email,
	prenom = req.body.prenom,
	nom = req.body.nom,
	age = req.body.age;
	id = req.body.id;

	if(check.mail(email)) {
		if (prenom.length < 50) {
			if (nom.length < 50) {
				if (age < 5 && age > 100) {
					res.write("Vous devez avoir entre 5 et 99 ans");
				} 	else {
						mysql.setUser(req.body);
						res.redirect('/home');
					}
			} 	else {
					res.write("Votre nom doit contenir maximum 50 caractères");
					res.end(req);
				}
		} 	else {
				res.write("Votre prenom doit contenir maximum 50 caractères");
				res.end(req);
			} 
	}
	else {
		res.write("Votre adresse email est incorrect");
		res.end(req);
	}

	res.redirect('/home');

}).use(function(req, res, next) {

	// 404

});

app.listen(8080);