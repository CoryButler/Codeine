import Interpreter from "../interpreter";
import Variable from "../variable";
import Operation from "./operation";

export default class Comment implements Operation {
    readonly key: string = "~";
    readonly description: string = "comment";
    readonly example: string = "~ this is a comment; (ignored on execution)";
    execute(args: Array<Variable>): void { /* noop */ }
}