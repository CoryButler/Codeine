import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Divide implements Operation {
    readonly key: string = "/";
    readonly description: string = "divide";
    readonly example: string = "/ my_var 12 — divides my_var by 12";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as dividend.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as divisor.`); return; }
        if (args[1].get() === 0) { Logger.log(`LINE ${Interpreter.lineNumber}: divisor cannot be set to 0.`); return; }
        //TODO: check or Infinity or args[1].get() = 0
        VariableLibrary.getInstance().set(args[0].key, args[0].get() / args[1].get());
    }
}