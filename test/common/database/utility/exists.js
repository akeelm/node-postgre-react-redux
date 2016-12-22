import exists from './../../../../common/database/utility/exists.js';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://akeel:1234@localhost:5432/nodey';
let client = new pg.Client(connectionString);
client.connect();

describe('tableExists', () => {
  it('should be able to return true if table exists', (done) => {
      const _exists = new exists(client, 'user');
      console.log(_exists.tableExists(client, 'user') + ' line 15');
      should.exist(baseClass.id);
  });
});
