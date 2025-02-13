import express from 'express'
import routes from './routes/index';
import {connectDb} from './connections/postgres.connection';
const app = express();

app.use(express.json());

app.use('/api', routes);

connectDb();

export default app
