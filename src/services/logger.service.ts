import { appendFileSync } from "fs";
import { ILogObject, ISettingsParam, Logger } from "tslog";

export class LoggerService {
    private logger: Logger;

    constructor(private readonly outputPath: string, private readonly settings?: ISettingsParam) {
        const loggerSettings = {
            displayLoggerName: true,
            name: 'Logger service',
            overwriteConsole: true,
            ...settings
        };

        this.logger = new Logger(loggerSettings);
        this.attachTransport();
    }

    private logToTransport(logObject: ILogObject) {
        appendFileSync(`${this.outputPath}/logs.txt`, JSON.stringify(logObject) + "\n");
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