import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Power implements Operation {
    readonly key: string = "^";
    readonly description: string = "power of";
    readonly example: string = "^ my_var 3 — sets my_var to itself to the power of 3";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as base number.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as exponent.`); return; }
        VariableLibrary.getInstance().set(args[0].key, Math.pow(args[0].get(), args[1].get()));
    }
}