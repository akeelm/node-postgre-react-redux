import base from './base.js';

class User extends base {
  constructor(id, firstname, surname, password, email, emailverified = false, createddate, updateddate) {
    super(id, createddate, updateddate)
    this.firstname = firstname;
    this.surname = surname;
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
      }
    );
  }
}

export default User;
