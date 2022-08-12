import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Assign implements Operation {
    readonly key: string = "=";
    readonly description: string = "assign";
    readonly example: string = "= my_var 12 — sets my_var to 12";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set for assignment.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no assignment value set.`); return; }
        VariableLibrary.getInstance().set(args[0].key, args[1].get());
    }
}