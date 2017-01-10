import base from './base.js';
const bcrypt = require('bcrypt');

class emailverification extends base {
  constructor(id, userid, code, createddate, updateddate) {
    super(id, createddate, updateddate)
    this.userid = userid;
    this.code = {value: code, type: 'string', required: true};

    //For validate.js we are appending to constraints in the base model
    Object.assign(this.constraints,
      {
        userid: {
          presence: true
        },
        code: {
          presence: true
        },
      }
    );
  }
}

export default emailverification;
