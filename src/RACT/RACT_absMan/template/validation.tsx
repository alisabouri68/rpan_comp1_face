/**
 * This is a JavaScript code snippet that defines a validation schema using the joi library. The joi library is commonly used for validating and sanitizing user input.
 *
 * The first line imports the joi library, making it available for use in this file.
 *
 * The validationSchema object defines various constraints on different data types, as described in the previous code challenge. These constraints will be used to validate data against the expected rules defined in validationSchema.
 *
 * In summary, this code sets up a validation schema using joi which can be used to ensure that data in a system conforms to specific constraints, while also leveraging the power and flexibility of joi to customize the validation rules.
 */
export default {
  string: {
    alphanum: false,
    email: false,
    length: null,
    lowercase: false,
    uppercase: false,
    max: null,
    min: null,
    pattern: null,
    trim: false,
  },
  number: {
    greater: null,
    less: null,
    max: null,
    min: null,
    integer: false,
    negative: false,
    positive: false,
    unsafe: false,
  },
  date: {
    greater: null,
    less: null,
    max: null,
    min: null,
    iso: false,
    timestamp: false,
  },
  boolean: {
    falsy: [],
    truthy: [],
    sensitive: false,
  },
  array: {
    length: null,
    max: null,
    min: null,
  },
  dictionary: {
    and: null,
    or: null,
    length: null,
    max: null,
    min: null,
    regex: false,
  },
};
