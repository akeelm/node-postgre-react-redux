var validate = require("validate.js");
var moment = require('moment');

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

class base {
  constructor(id, createddate, updateddate) {
    this.id = id;
    this.createddate = createddate || new Date();
    this.updateddate = updateddate || new Date();

    this.constraints = {
      id: {
        presence: true,
        numericality: {
          onlyInteger: true,
          message: "id should be a number"
        }
      },
      createddate: {
        presence: true
      }
    };

    this.isValid = function() {
      return validate(this, this.constraints);
    }
  }
}

export default base;
