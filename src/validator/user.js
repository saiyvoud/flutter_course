import Validator from "validator";
import isEmpty from "../middleware/is-empty.js";

export default function ValidCreateUser(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required.";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required.";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export function ValidUpdateUser(data) {
    let errors = {};
  
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.password = !isEmpty(data.password) ? data.password : "";
  
    if (Validator.isEmpty(data.firstName)) {
      errors.firstName = "firstName field is required.";
    }
    if (Validator.isEmpty(data.lastName)) {
      errors.lastName = "lastName field is required.";
    }
    if (Validator.isEmpty(data.phone)) {
      errors.phone = "phone field is required.";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "password field is required.";
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
