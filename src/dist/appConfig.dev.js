"use strict";

var config = {
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "https://gelisim.herokuapp.com/api/v1/"
      : "",
};
module.exports = config;
