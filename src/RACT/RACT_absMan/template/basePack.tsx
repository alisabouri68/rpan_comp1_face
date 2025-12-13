"use strict";

/**
 * This is a JavaScript code snippet that exports an object. The object contains a property called Meta which itself is an object.
 *
 * The Meta object has five properties:
 **   id which is an empty string
 **   title which is an empty string
 **   description which is an empty string
 **   fieldArray which is an empty array
 **   fieldSerial which is set to 0
 *
 *   This code can be used as a starting point for building an object that will store metadata about Packs.
 *
 */
export default {
  Meta: {
    id: "",
    title: "",
    description: "",
    fieldArray: [],
    fieldSerial: 0,
  },
  // options: {
  //     timestamp: true,
  //     paranoid: true,
  //     owner: true,
  // }
};
