import { appendFileSync } from "fs";
import { resolve } from "path";
import { ILogObject, ISettingsParam, Logger } from "tslog";

export class LoggerService {

    private static _instance: LoggerService;
    private static _outputFilePath: string;
    private static _loggerSettings?: ISettingsParam

    private logger: Logger;

    private constructor(outputFilePath?: string, settings?: ISettingsParam) {
        LoggerService._outputFilePath = outputFilePath ? outputFilePath : './logs/logs.txt';
        LoggerService._loggerSettings = {
            displayLoggerName: true,
            name: 'Logger service',
            overwriteConsole: true,
            ...settings
        }

        this.logger = new Logger(LoggerService._loggerSettings);
        this.attachTransport();
    }

    public static Instance(outputFilePath?: string, settings?: ISettingsParam) {
        return this._instance || (this._instance = new this(outputFilePath, settings));
    }

    private logToTransport(logObject: ILogObject) {
        console.log(LoggerService._outputFilePath);
        appendFileSync(LoggerService._outputFilePath as string, JSON.stringify(logObject) + "\n");
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