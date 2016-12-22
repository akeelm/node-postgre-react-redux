let pg = require('pg');
let connectionString = process.env.DATABASE_URL || 'postgres://akeel:1234@localhost:5432/nodey';

//let tableExists = './utility/exists.js';
import tableExists from './utility/exists.js';

let client = new pg.Client(connectionString);
client.connect();

tableExists(client, 'users');

let query = client.query(
  `CREATE TABLE users
    (id SERIAL PRIMARY KEY,
    firstname text not null,
    surname text not null,
    password text not null,
    email text not null,
    emailverified boolean,
    created timestamp with time zone,
    lastupdated timestamp with time zone)`);
query.on('end', () => { client.end(); });
