import * as bodyparser from "body-parser";
import cors from "cors";
import debug from "debug";
import * as dotenv from "dotenv";
import express from "express";
import * as expressWinston from "express-winston";
import * as http from "http";
import { Client as pgClient } from "pg";
import * as winston from "winston";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { UsersRoutes } from "../users/users.routes.config";
dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("index");
const debugLogDB: debug.IDebugger = debug("index-db");
app.use(bodyparser.json());
app.use(cors());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);
routes.push(new UsersRoutes(app));
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);
(async () => {
  const client = new pgClient({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number.parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
  });
  try {
    await client.connect();
    // const query = await client.query(`SELECT * FROM users LIMIT 1`);
    debugLogDB("db connected ");
    //c
  } catch (err) {
    debugLogDB(err);
  }
})();
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});
server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
