import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import { isCustomMethod, removeSpecific } from "./operationsDictionary";

export default class Deallocate implements Operation {
    readonly key: string = "!";
    readonly description: string = "deallocate";
    readonly example: string = "! my_var; (deallocates my_var)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set for deallocation.`); return; }
        if (isCustomMethod(args[0].key)) removeSpecific(args[0].key);
        VariableLibrary.getInstance().remove(args[0].key);
    }
}