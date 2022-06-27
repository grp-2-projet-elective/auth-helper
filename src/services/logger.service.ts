import { ISettingsParam, Logger } from "tslog";

export class LoggerService {
    private logger: Logger;

    constructor(private readonly loggerSettings?: ISettingsParam) {
        loggerSettings = {
            displayLoggerName: true,
            name: 'Logger service',
            overwriteConsole: true,
            ...loggerSettings
        };

        this.logger = new Logger(loggerSettings);
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