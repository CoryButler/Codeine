import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Modulo implements Operation {
    readonly key: string = "%";
    readonly description: string = "module";
    readonly example: string = "% my_var 3; (sets my_var to itself modulo 3)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as modulo dividend.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as modulo divisor.`); return; }
        if (args[1].get() === 0) { Logger.log(`LINE ${Interpreter.lineNumber}: modulo divisor cannot be set to 0.`); return; }
        VariableLibrary.getInstance().set(args[0].key, args[0].get() % args[1].get());
    }
}