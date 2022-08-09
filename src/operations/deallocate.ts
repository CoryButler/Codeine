import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import OperationsDictionary from "./operationsDictionary";

export default class Deallocate implements Operation {
    readonly key: string = "!";
    readonly description: string = "deallocate";
    readonly example: string = "! my_var; (deallocates my_var)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set for deallocation.`); return; }
        if (OperationsDictionary.getInstance().isCustomMethod(args[0].key)) OperationsDictionary.getInstance().removeSpecific(args[0].key);
        VariableLibrary.getInstance().remove(args[0].key);
    }
}