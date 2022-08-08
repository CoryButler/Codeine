import Interpreter from "../interpreter";
import Logger from "../logger";
import Statement from "../statement";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import MethodTemplate from "./methodTemplate";
import { operationsDictionary } from "./operationsDictionary";
import { setTempOperationsDictionary, resetOperationsDictionary } from "./operationsDictionary";

export default class MethodCreate implements Operation {
    readonly key: string = ">";
    readonly description: string = "custom method";
    readonly example: string = "> my_method {\n...\n}; (runs statements on lines between braces when using my_method as a command)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no method name set.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no method operations set.`); return; }
        //@ts-ignore
        if (!isNaN(args[0].key.parseFloatStrict())) {
            Logger.log(`LINE ${Interpreter.lineNumber}: method name cannot be a number. "${args[0].key}"`); //TODO: error not thrown when !isNan(...) === true
            return;
        }
        if (!this.isValidMethodName(args[0].key)) {
            Logger.log(`LINE ${Interpreter.lineNumber}: "${args[0].key}" is not a unique method name.`);
            return;
        }

        const declarationLineNumber = Interpreter.lineNumber - 1;

        const methodExecute = () => {
            setTempOperationsDictionary();
            let currentLineNumber = declarationLineNumber;
            const tempLineNumber = Interpreter.lineNumber + 1;
            const code: string = args[1].key;
            //@ts-ignore
            const lines = code.split("\n").join("").split(code.splitFlag).join(" ").split(",");
            lines.forEach(line => {
                Interpreter.lineNumber = ++currentLineNumber;
                if (line.trim() !== "" && !line.trim().startsWith("~")) new Statement(line).run();
            });
            Interpreter.lineNumber = tempLineNumber;
        
            resetOperationsDictionary();
        };

        const method: MethodTemplate = new MethodTemplate();
        method.setKey(args[0].key);
        const methodObject = { key: args[0].key, op: MethodTemplate };
        methodObject.op.prototype.execute = methodExecute;

        VariableLibrary.getInstance().add(args[0].key, null);
        operationsDictionary.push(methodObject);
    }

    isValidMethodName (key: string): boolean {
        //@ts-ignore
        return isNaN(key.parseFloatStrict()) && !operationsDictionary.some(op => { console.log(op.key); return op.key === key; });
    }
}