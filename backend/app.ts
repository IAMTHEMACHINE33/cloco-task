import express, {urlencoded} from "express";
import { RegisterRoutes } from "./build/routes";
import {connectDb} from './connections/postgres.connection';
import { errorHandler } from "./utils/errorHandler";
const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

// Swagger
RegisterRoutes(app);

// Db
connectDb();

app.use(errorHandler);

export default app
