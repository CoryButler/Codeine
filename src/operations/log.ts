import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import Logger from "../logger";
import Interpreter from "../interpreter";

export default class Log implements Operation {
    readonly key: string = "<";
    readonly description: string = "log";
    readonly example: string = "< my_var; (logs value of my_var)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set to be logged.`); return; }
        if (!isNaN(args[0].get())) Logger.log(args[0].get());
        else Logger.log(VariableLibrary.getInstance().get(args[0].key).get());
    }
}