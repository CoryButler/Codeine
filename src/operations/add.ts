import { Variable } from "../Variable";
import { Operation } from "./operation";

export class Add extends Operation {
    public readonly key: string = "+";
    public execute(args: Array<Variable>): number {
        console.log("add");
        console.log(args);
        return args[0].get() + args[1].get();
    }
}