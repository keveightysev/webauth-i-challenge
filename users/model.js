const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findById,
	findBy,
};

function find() {
	return db('users').select('id', 'username', 'password');
}

async function add(user) {
	const [id] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

function findBy(params) {
	return db('users')
		.where(params)
		.first();
}
