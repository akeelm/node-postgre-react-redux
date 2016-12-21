import base from './base.js';

class user extends base {
  constructor(id, firstname, surname, password, email, emailverified = false, createddate, updateddate) {
    super(id, createddate, updateddate)
    this.firstname = firstname;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.emailverified = emailverified
  }
}

export default user;
