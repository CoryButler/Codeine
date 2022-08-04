import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import Logger from "../logger";

export default class Log implements Operation {
    readonly key: string = "<";
    readonly description: string = "log";
    readonly example: string = "< my_var; (logs value of my_var)";
    execute(args: Array<Variable>): void {
        Logger.log(VariableLibrary.getInstance().get(args[0].key).get());
    }
}