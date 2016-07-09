var mysql = require('mysql');
var connection = null;

var connect = function() {
		connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'root',
		  database : 'cours-dev',
		  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
		});

};

var checkConnect = function() {
	if(connection == null) {
		connect();
	}
};

var setUser = function(data) {
	if(connection == null) {
		connect();
	}
	emailExists(data, insertUser);
};

var insertUser = function(data, emailExists) {

	if(emailExists) {
	} else {

		var query = connection.query('INSERT INTO users SET ?', data, function(err, result) {

			console.log(data['nom'] + "a été ajouté");
		});
	}
};

var deleteUser = function(id) {


	var query = connection.query('DELETE FROM users WHERE id = ?', id, function (err, result) {

      console.log("l'id numéro " + id + ' a été supprimé');

    })

};

var editUser = function(data) {

	var query = connection.query('UPDATE users SET nom = ?, prenom = ?, age = ?, email = ? WHERE id = ?', [data.nom, data.prenom, data.age, data.email, data.id], function (err, result) {

      console.log(data['nom'] + ' a été mis à jour');

    })

};

var emailExists = function(data, callback) {

	if(connection == null) {
		connect();
	}
	var query = connection.query('SELECT * FROM users WHERE email = ?', data.email, function(error, results, fields) {
		callback(data, ((results.length>0)?true:false));
	});

};

var listUsers = function(callback) {

	if(connection == null) {
		connect();
	}

	var query = connection.query('SELECT * FROM users ORDER BY id DESC', function(err, rows) {

		if(err) throw err;

		if(rows.length > 0) {
			callback(rows);
		} else {
			callback(null);
		}

	});
};

var selectUsers = function(id, callback) {

	if(connection == null) {
		connect();
	}

	var query = connection.query('SELECT * FROM users WHERE id = ?', id, function(err, rows) {

		if(err) throw err;

		if(rows.length > 0) {
			callback(rows);
		} else {
			callback(null);
		}
	});
};

exports.setUser = setUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.listUsers = listUsers;
exports.selectUsers = selectUsers;
exports.emailExists = emailExists;


