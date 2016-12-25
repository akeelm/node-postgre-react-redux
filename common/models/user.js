import base from './base.js';
const bcrypt = require('bcrypt');

class user extends base {
  constructor(id, firstname, surname, password, email, emailverified = false, createddate, updateddate) {
    super(id, createddate, updateddate)
    this.firstname = {value: firstname, type: 'string', required: true};
    this.surname = {value: surname, type: 'string', required: true };
    this.password = password;
    this.email = email;
    this.emailverified = emailverified

    //For validate.js we are appending to constraints in the base model
    Object.assign(this.constraints,
      {
        firstname: {
          presence: true
        },
        surname: {
          presence: true
        },
        email: {
          presence: true,
          email: true
        },
        password: {
          presence: true
        }
      }
    );
  }

  generateHash(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
}

export default user;
