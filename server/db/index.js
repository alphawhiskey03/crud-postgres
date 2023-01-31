const { Pool } = require("pg");
const { databaseCredentials } = require("../constants");
const pool = new Pool(databaseCredentials);
module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
