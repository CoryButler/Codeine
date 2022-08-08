import "./extensions/implementations";
import Logger from "./logger";
import Statement from "./statement";
import VariableLibrary from "./variableLibrary";
import { resetOperationsDictionary } from "./operations/operationsDictionary";

export default abstract class Interpreter {
    public static lineNumber: number;

    public static run(code: string): void {
        this.lineNumber = 1;
        VariableLibrary.getInstance().clear();
        resetOperationsDictionary();
        Logger.clear();
        this.parseCode(code).forEach(line => {
            new Statement(line).run();
        });
    }

    private static parseCode(code: string): Array<string> {
        //@ts-ignore
        const lines = code.replaceAll(";", "").replaceAll("\n", ";").split(";");

        const toRemove: Array<number> = [];

        for (let i = 0; i < lines.length; i++) {
            let lookAt = 1;
            while (lines[i].includes("{") && !lines[i].includes("}")) {
                lines[i] += "," + lines[i + lookAt];
                toRemove.push(i + lookAt++);
            }
    
            if (lines[i].includes("{") && lines[i].includes("}")) {
                let f = lines[i].substring(lines[i].indexOf("{") + 1, lines[i].indexOf("}"));
                //@ts-ignore
                f = f.replaceAll(" ", f.splitFlag);
                lines[i] = lines[i].substring(0, lines[i].indexOf("{")) + f;
            }
        }

        for (let i = toRemove.length - 1; i >= 0; i--) {
            lines.splice(toRemove[i], 1);
        }

        return lines;
    }
}