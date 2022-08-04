import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class SquareRoot implements Operation {
    readonly key: string = "_";
    readonly description: string = "square root";
    readonly example: string = "_ my_var; (sets my_var to its square root)";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().set(args[0].key, Math.sqrt(args[0].get()));
    }
}