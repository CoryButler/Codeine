import { Variable } from "../Variable";

export abstract class Operation {
    public readonly key: string;
    execute(args: Array<Variable>): any {}
}