import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Define implements Operation {
    readonly key: string = "@";
    readonly description: string = "define";
    readonly example: string = "@ my_var (value?) — defines my_var and optionally sets it to value (defalut: 0)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set for declaration.`); return; }
        VariableLibrary.getInstance().add(args[0].key, args[1] ? args[1].get() : 0);
    }
}