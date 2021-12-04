const {Pool} = require("pg");
const migrations = require("./index");

let db = new Pool({
	user: "postgres",
	host: "localhost",
	password: "root",
	port: 5432,
});

const migrate = async (db) => {
	await db.query(migrations.inspector);
	await db.query(migrations.lecture);
	await db.query(migrations.student);
	await db.query(migrations.attendance);
}

db.query(`
      SELECT datname
      FROM pg_database
      WHERE datname = 'finger_print'
  `, async (err, result) => {
		if (result.rows.length === 0) {
			await db.query(`
        	    CREATE DATABASE finger_print;
      	    `);
		}

		db = await new Pool({
			user: "postgres",
			host: "localhost",
			database: "finger_print",
			password: "root",
			port: 5432,
		});

		await migrate(db);

		await db.end();

		process.exit(0);
	},
);