import Variable from "../variable";
import Operation from "./operation";
import Statement from "../statement";
import Interpreter from "../interpreter";
import Logger from "../logger";
import OperationsDictionary from "./operationsDictionary";
import VariableLibrary from "../variableLibrary";

export default class Loop implements Operation {
    readonly key: string = "&";
    readonly description: string = "loop";
    readonly example: string = "& 4 {\n...\n} — runs statements on lines between braces 4 times; use # to access index";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no loop limit set.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no loop operations set.`); return; }
        OperationsDictionary.getInstance().setTemp();
        const code: string = args[1].key;
        //@ts-ignore
        const lines = code.split("\n").join("").split(code.splitFlag).join(" ").split(",");
        for (let i = 0; i < args[0].get(); i++) {
            OperationsDictionary.getInstance().setTemp();
            VariableLibrary.getInstance().setTemp();
            
            Interpreter.lineNumber -= (lines.length - 1) * (i > 0 ? 1 : 0);
            lines.forEach(line => {
                //@ts-ignore
                if (line.trim() !== "") new Statement(line.trim().replaceAll("#", i.toString())).run();
            });
            
            OperationsDictionary.getInstance().resetFromTemp();
            VariableLibrary.getInstance().resetFromTemp();
        }
        OperationsDictionary.getInstance().resetFromTemp();
        Interpreter.lineNumber++; /* TODO */
    }
}