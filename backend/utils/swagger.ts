import { type Express, type Response, type Request } from "express";
import swaggerUI from "swagger-ui-express";


async function swaggerDocs (app: Express): Promise<any> {
    const swaggerJsDocs = await import("../build/swagger.json") 
    // Swagger page
    app.use(
        "/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerJsDocs)
    );
}

export default swaggerDocs;
