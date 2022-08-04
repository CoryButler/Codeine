import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Deallocate implements Operation {
    readonly key: string = "!";
    readonly description: string = "deallocate";
    readonly example: string = "! my_var; (deallocates my_var)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().remove(args[0].key);
    }
}