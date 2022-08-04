import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Modulo implements Operation {
    readonly key: string = "%";
    readonly description: string = "module";
    readonly example: string = "% my_var 3; (sets my_var to itself modulo 3)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().set(args[0].key, args[0].get() % args[1].get());
    }
}