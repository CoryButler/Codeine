import { Add } from "./operations/add";
import { Operation } from "./operations/operation";
import { operationsDictionary } from "./operations/operationsRecord";
import { Variable } from "./Variable";
import { VariableLibrary } from "./VariableLibrary";

export class Statement {
    private _varLib: VariableLibrary;
    private _elements: Array<string>;
    private _operation: Operation;
    private _args: Array<Variable>;

    constructor(code: string, varLib: VariableLibrary) {
        this._elements = code.split(" ");
        this._varLib = varLib;
        this._args = [];
        this.parse();
    }

    private parse() {
        this._operation = new Add(); //operationsDictionary.find(opDict => opDict.key === this._elements[0]).op;
        const argStrings = this._elements.splice(1);
        console.log("a");
        argStrings.forEach(el => {
            console.log("c");
            this._args.push(this._varLib.get(el));
            console.log("d");
        });
        console.log("b");
    }

    public run() {
        if (this._operation)
            this._operation.execute(this._args);
        else
            console.error(`"${this._elements[0]}" is an invalid operation.`)
    }
}