import * as Knex from "knex";
import { tableNames } from "../../src/constants";
export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable(tableNames.user, (table) => {
    table.increments("userId").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.dateTime("last_login");
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(tableNames.user);
};
