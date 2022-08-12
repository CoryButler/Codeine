import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Subtract implements Operation {
    readonly key: string = "-";
    readonly description: string = "subtract";
    readonly example: string = "- my_var 12 — subtracts 12 from my_var";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as minuend.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as subdrahend.`); return; }
        VariableLibrary.getInstance().set(args[0].key, args[0].get() - args[1].get());
    }
}