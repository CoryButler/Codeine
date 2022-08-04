import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Multiply implements Operation {
    readonly key: string = "*";
    readonly description: string = "multiply";
    readonly example: string = "* my_var 12; (multiplies my_var by 12)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().set(args[0].key, args[0].get() * args[1].get());
    }
}