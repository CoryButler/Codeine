import Interpreter from "../interpreter";
import Logger from "../logger";
import Statement from "../statement";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";
import OperationsDictionary from "./operationsDictionary";

export default class MethodCreate implements Operation {
    readonly key: string = ">";
    readonly description: string = "custom method";
    readonly example: string = "> my_method {\n...\n}; (runs statements on lines between braces when using my_method as a command; use # to access the argument)";
    execute(args: Array<Variable>): void {
        if (!args[0]) { Logger.log(`LINE ${Interpreter.lineNumber}: no method name set.`); return; }
        if (!args[1]) { Logger.log(`LINE ${Interpreter.lineNumber}: no method operations set.`); return; }
        if (args[0].key === VariableLibrary._tempFlag) {
            Logger.log(`LINE ${Interpreter.lineNumber}: method name cannot be a number.`);
            return;
        }
        if (!this.isValidMethodName(args[0].key)) {
            Logger.log(`LINE ${Interpreter.lineNumber}: "${args[0].key}" is not a unique method name.`);
            return;
        }

        const declarationLineNumber = Interpreter.lineNumber - 1;

        const method = class T implements Operation {
            key: string = args[0].key;
            description: string;
            example: string;
            execute(argsLocal: Variable[]): void {
                OperationsDictionary.getInstance().setTemp(); //TODO: is this needed?
                VariableLibrary.getInstance().setTemp(); //TODO: is this needed?

                //TODO: braces do not work within loops and methods
    
                let currentLineNumber = declarationLineNumber;
                const tempLineNumber = Interpreter.lineNumber + 1;
                const code: string = args[1].key;
                //@ts-ignore
                const lines = code.replaceAll("#", argsLocal[0].get()).split(",");
                lines.forEach((line, i) => {
                    Interpreter.lineNumber = ++currentLineNumber;
                    if (line.trim().startsWith(">")) { Logger.log(`LINE ${Interpreter.lineNumber}: cannot define a method within a method.`); }
                    //@ts-ignore
                    else if (line.trim() !== "" && !line.trim().startsWith("~")) new Statement(line.replaceAll(line.splitFlag, " ")).run();
                });
                Interpreter.lineNumber = tempLineNumber;
            
                OperationsDictionary.getInstance().resetFromTemp();
                VariableLibrary.getInstance().resetFromTemp();
            }
        };

        const methodObject = { key: new method().key, op: method };

        VariableLibrary.getInstance().add(args[0].key, null);
        OperationsDictionary.getInstance().push(methodObject);
    }

    isValidMethodName (key: string): boolean {
        //@ts-ignore
        return !OperationsDictionary.getInstance().dictionary().some(op => op.key === key);
    }
}