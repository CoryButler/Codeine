import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Multiply implements Operation {
    readonly key: string = "*";
    readonly description: string = "multiply";
    readonly example: string = "* my_var 12 — multiplies my_var by 12";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as multiplicand.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as multiplier.`); return; }
        VariableLibrary.getInstance().set(args[0].key, args[0].get() * args[1].get());
    }
}