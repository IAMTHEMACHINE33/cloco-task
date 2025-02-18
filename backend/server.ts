import app from './app';
import dotenv from 'dotenv';
import swaggerDocs from './utils/swagger';

dotenv.config();
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    swaggerDocs(app);
    console.log(`Docs at http://localhost:${port}/docs/`)
})
