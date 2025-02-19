import express, {urlencoded} from "express";
import { RegisterRoutes } from "./build/routes";
import {connectDb} from './connections/postgres.connection';
import { errorHandler } from "./utils/errorHandler";
import cors from "cors";
import path from "path";
const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cors())

app.use('/docs/openapi.json', express.static(path.join(__dirname, './build/swagger.json')));

// Swagger
RegisterRoutes(app);

// Db
connectDb();

app.use(errorHandler);

export default app
