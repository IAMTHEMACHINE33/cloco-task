import express, {urlencoded} from "express";
import routes from './routes/index';
import { RegisterRoutes } from "./build/routes";
import {connectDb} from './connections/postgres.connection';
const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use('/api', routes);

// Swagger
RegisterRoutes(app);

// Db
connectDb();

export default app
