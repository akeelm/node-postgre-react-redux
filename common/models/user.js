import base from './base.js';

class user extends base {
  constructor(id, firstname, surname, password, email, emailverified = false, createddate, updateddate) {
    super(id, createddate, updateddate)
    this.firstname = {value: firstname, type: 'string', required: true};
    this.surname = {value: surname, type: 'string', required: true };
    this.password = password;
    this.email = email;
    this.emailverified = emailverified

    //For validate.js append to constraints in the base model
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
}

export default user;
