import { Application } from "express";
import { serve, setup } from "swagger-ui-express";
import { LoggerService } from "./logger.service";

export class SwaggerService {

    private constructor(private readonly app: Application, private readonly Logger: LoggerService, private readonly docUri: string, private readonly swaggerFile: any) {
        this.app = app;
        this.Logger = Logger;
        this.docUri = docUri;
        this.swaggerFile = swaggerFile;
    }

    public initSwaggerService(): void {
        this.app.use(this.docUri, serve, setup(this.swaggerFile));
        this.Logger.info('Swagger Service initialized');
        this.Logger.info(`Swagger documentation available at: ${this.docUri}`);
    }
}