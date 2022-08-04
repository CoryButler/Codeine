import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Divide implements Operation {
    readonly key: string = "/";
    readonly description: string = "divide";
    readonly example: string = "/ my_var 12; (divides my_var by 12)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().set(args[0].key, args[0].get() / args[1].get());
    }
}