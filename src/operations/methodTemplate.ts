import Variable from "../variable";
import Operation from "./operation";

export default class MethodTemplate implements Operation {
    key: string;
    readonly description: string;
    readonly example: string;
    execute(args: Array<Variable>): void {};

    public setKey(key: string) {
        this.key = key;
    }

    public setExecute(execute): void {
        this.execute = execute;
    }
}