import Variable from "../variable";

export default interface Operation {
    readonly key: string;
    readonly description: string;
    readonly example: string;
    execute(args: Array<Variable>): void;
}