const pg = require("pg");
delete pg.native;

const db = new pg.Pool({
	user: "postgres",
	host: "localhost",
	database: "finger_print",
	password: "root",
	port: 5432,
});

module.exports = db;