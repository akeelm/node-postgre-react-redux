import db from './../../../../common/database/db.js';
import exists from './../../../../common/database/utility/exists.js';

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('tableExists', () => {
  it('should not return null if table exists', (done) => {
    db.db_utility.does_table_exist(['users'], function(err, res){
      should.not.equal(res[0].to_regclass, null);
      done();
    });
    console.log(exists('users'));
  });

  it('should return null if table exists', (done) => {
    db.db_utility.does_table_exist(['random'], function(err, res){
      should.equal(res[0].to_regclass, null);
      done();
    });
  });
});
