import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }
  configureRoutes() {
    this.app
      .route("/users")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send("list of users");
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send("post of users");
      });
    this.app
      .route("/users/:userId")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before any request to /users/:userId
          // but it doesn't accomplish anything just yet---
          // it simply passes control to the next applicable function below using next()
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      });

    return this.app;
  }
}
