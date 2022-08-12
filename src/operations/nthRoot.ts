import Interpreter from "../interpreter";
import Logger from "../logger";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class NthRoot implements Operation {
    readonly key: string = "_";
    readonly description: string = "nth root";
    readonly example: string = "_ my_var (my_root_index?) — sets my_var to its my_root_index (defaut: 2) root";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no variable set as radicand.`); return; }
        if (args[1] && args[1].get() === 0) { Logger.log(`LINE ${Interpreter.lineNumber}: root index cannot be 0.`); return; }
        VariableLibrary.getInstance().set(args[0].key, Math.pow(args[0].get(), (1 / (args[1] ? args[1].get() : 2))));
    }
}