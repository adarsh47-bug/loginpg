const pg = require('pg');

// PGSQL DB

const config = {
  host: 'postgres.postgres.database.azure.com',
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: 'clwjxzjhpu',
  password: '13LFK6O4N0WN5S64$',
  // password: '15Euross',
  database: 'postgres',
  port: 5432,
  ssl: true
};

// const url = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`

const client = new pg.Client({ host: config.host, user: "clwjxzjhpu", password: "13LFK6O4N0WN5S64$", database: "postgres", port: 5432, ssl: false });

// const client = new pg.Client(config);

// Functions DB

function queryDatabase() {
  const query = `
      DROP TABLE IF EXISTS inventory;
      CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50) NOT NULL, quantity INTEGER NOT NULL);
      INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
      INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
      INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
  `;

  client
    .query(query)
    .then(() => {
      console.log('Table created successfully!');
      // client.end(console.log('Closed client connection'));
    })
    .catch(err => console.log(err))
    .then(() => {
      console.log('Finished execution, exiting now');
      // process.exit();
    });
}

function queryDatabaseRead() {
  let setext;
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  const query = 'SELECT * FROM inventory;';

  client.query(query)
    .then(res => {
      const rows = res.rows;

      rows.map(row => {
        setext = [].push(`Read: ${JSON.stringify(row)}`);
        console.log(`Read: ${JSON.stringify(row)}`);
      });

      // process.exit();
    })
    .catch(err => {
      console.log(err);
    });
  return setext;
}

module.exports = { queryDatabaseRead, queryDatabase, client };