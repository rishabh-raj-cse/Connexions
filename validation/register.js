const Validator = require("validator");
const isEmpty = require("./is-Empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : " ";
  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";
  data.password2 = !isEmpty(data.password2) ? data.password2 : " ";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 chars";
  }
  if (!Validator.isEmpty(data.name)) {
    errors.name = "Name fieldis req";
  }

  if (!Validator.isEmpty(data.email)) {
    errors.name = "emailfieldis req";
  }

  if (!Validator.isEmail(data.email)) {
    errors.name = "emailfieldis req";
  }

  if (!Validator.isEmpty(data.password)) {
    errors.name = " pasdwfieldis req";
  }

  if (Validator.equals(data.password, data.password2)) {
    errors.password = "Password fiels is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
