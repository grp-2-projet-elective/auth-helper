import { appendFileSync, existsSync, openSync } from "fs";
import { ILogObject, ISettingsParam, Logger } from "tslog";

export class LoggerService {

    private static _instance: LoggerService;
    private _outputFilePath: string;

    private logger: Logger;

    private constructor(loggerName: string, outputFilePath: string) {
        this._outputFilePath = outputFilePath;
        const loggerSettings = {
            displayLoggerName: true,
            name: loggerName,
            overwriteConsole: true
        }

        this.logger = new Logger(loggerSettings);
        this.attachTransport();
    }

    public static Instance(loggerName: string, outputFilePath: string) {
        return this._instance || (this._instance = new this(loggerName, outputFilePath));
    }

    private logToTransport(logObject: ILogObject) {
        appendFileSync(this._outputFilePath, JSON.stringify(logObject) + "\n");
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