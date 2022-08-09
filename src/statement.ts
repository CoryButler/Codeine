import Interpreter from "./interpreter";
import Logger from "./logger";
import Operation from "./operations/operation";
import OperationsDictionary from "./operations/operationsDictionary";
import Variable from "./variable";
import VariableLibrary from "./variableLibrary";

export default class Statement {
    private _elements: Array<string>;
    private _operation: Operation;
    private _args: Array<Variable>;

    constructor(code: string) {
        this._elements = code.split(" ");
        this._args = [];
        this.parse();
    }

    private parse() {
        const operationObject = OperationsDictionary.getInstance().find(this._elements[0]);
        if (operationObject)
            this._operation = operationObject.op.prototype;
            
        const argStrings = this._elements.splice(1);
        argStrings.forEach(el => {
            this._args.push(VariableLibrary.getInstance().get(el));
        });
    }

    public run() {
        if (this._operation) {
            this._operation.execute(this._args);
        }
        else if (this._elements[0].trim() !== "") {
            Logger.log(`LINE ${Interpreter.lineNumber}: "${this._elements[0]}" is an invalid operation.`);
        } else if (this._elements[0].trim() === "") {
            //Interpreter.lineNumber--;
        }

        Interpreter.lineNumber++;
    }
}