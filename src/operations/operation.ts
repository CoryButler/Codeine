import Variable from "../variable";

export default abstract class Operation {
    readonly key: string;
    readonly description: string;
    readonly example: string;
    execute(args: Array<Variable>): void {};
}