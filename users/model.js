const db = require('../data/dbConfig.js');

module.exports = {
	find,
};

function find() {
	return db('users').select('id', 'username', 'password');
}
