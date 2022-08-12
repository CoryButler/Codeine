export default abstract class Logger {
    private static _log: string = "";

    public static clear(): void {
        this._log = "";
    }

    public static log(str: any): void {
        this._log += str + "\n\n";
    }

    public static getLog(): string {
        return this._log;
    }
}