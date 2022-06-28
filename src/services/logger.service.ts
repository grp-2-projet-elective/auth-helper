import { appendFileSync } from "fs";
import { ILogObject, ISettingsParam, Logger } from "tslog";

export class LoggerService {

    private static _instance: LoggerService;

    private logger: Logger;

    private constructor(private readonly outputFilePath: string = 'logs/log.txt', private readonly settings: ISettingsParam = {
        displayLoggerName: true,
        name: 'Logger service',
        overwriteConsole: true
    }) {
        this.logger = new Logger(settings);
        this.attachTransport();
    }

    public static Instance(outputPath: string, settings?: ISettingsParam) {
        return this._instance || (this._instance = new this(outputPath, settings));
    }

    private logToTransport(logObject: ILogObject) {
        appendFileSync(this.outputFilePath, JSON.stringify(logObject) + "\n");
    }

    private attachTransport(): void {
        this.logger.attachTransport(
            {
                silly: this.logToTransport,
                debug: this.logToTransport,
                trace: this.logToTransport,
                info: this.logToTransport,
                warn: this.logToTransport,
                error: this.logToTransport,
                fatal: this.logToTransport,
            },
            "debug"
        );
    }

    public silly(...args: Array<any>): void {
        this.logger.silly(...args);
    }

    public trace(...args: Array<any>): void {
        this.logger.trace(...args);
    }

    public debug(...args: Array<any>): void {
        this.logger.debug(...args);
    }

    public info(...args: Array<any>): void {
        this.logger.info(...args);
    }

    public warn(...args: Array<any>): void {
        this.logger.warn(...args);
    }

    public error(...args: Array<any>): void {
        this.logger.error(...args);
    }

    public fatal(...args: Array<any>): void {
        this.logger.fatal(...args);
    }
}