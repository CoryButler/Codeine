import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Define implements Operation {
    readonly key: string = "@";
    readonly description: string = "define";
    readonly example: string = "@ my_var 12; (defines my_var and optionally sets it to 12 (defalut: 0))";
    execute(args: Array<Variable>): void {
        VariableLibrary.getInstance().add(args[0].key, args[1] ? args[1].get() : 0);
    }
}