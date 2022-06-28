import { appendFileSync, existsSync, openSync } from "fs";
import { ILogObject, ISettingsParam, Logger } from "tslog";

export class LoggerService {

    private static _instance: LoggerService;
    private static _outputFilePath: string;

    private logger: Logger;

    private constructor(outputFilePath?: string, settings?: ISettingsParam) {
        LoggerService._outputFilePath = outputFilePath ? outputFilePath : './logs/logs.txt';
        const loggerSettings = {
            displayLoggerName: true,
            name: 'Logger service',
            overwriteConsole: true,
            ...settings
        }

        console.log(loggerSettings)

        this.logger = new Logger(loggerSettings);
        this.attachTransport();
    }

    public static Instance(outputFilePath?: string, settings?: ISettingsParam) {
        return this._instance || (this._instance = new this(outputFilePath, settings));
    }

    private logToTransport(logObject: ILogObject) {
        if (!existsSync(LoggerService._outputFilePath)) openSync(LoggerService._outputFilePath, 'w');
        appendFileSync(LoggerService._outputFilePath, JSON.stringify(logObject) + "\n");
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