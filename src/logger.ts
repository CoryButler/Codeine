export default abstract class Logger {
    public static clear(): void {
        document.getElementById("log").innerHTML = "";
    }

    public static log(str: any): void {
        document.getElementById("log").innerHTML += str + "\n\n";
    }

    public static logToConsole(str: any): void {
        console.log(str);
    }
}