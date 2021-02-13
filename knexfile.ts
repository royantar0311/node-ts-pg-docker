require("ts-node/register");
require("dotenv/config");
console.log(process.env.POSTGRES_DB + " " + process.env.POSTGRES_USER);
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
    },
  },
};
