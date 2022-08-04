import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Add implements Operation {
    readonly key: string = "+";
    readonly description: string = "add";
    readonly example: string = "+ my_var 12; (adds 12 to my_var)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().set(args[0].key, args[0].get() + args[1].get());
    }
}