import Interpreter from "../interpreter";
import Variable from "../variable";
import VariableLibrary from "../variableLibrary";
import Operation from "./operation";

export default class Method implements Operation {
    readonly key: string = ">";
    readonly description: string = "custom method";
    readonly example: string = "> my_method {\n...\n}; (runs statements on lines between braces when using my_method as a command)";
    execute(args: Array<Variable>): void {

        //TODO: get custom methods working, and keep track of line number

        const code: string = args[1].key;
        //@ts-ignore
        const lines = code.split("\n").join("").split(code.splitFlag).join(" ").split(",");
        for (let i = 0; i < args[0].get(); i++) {
            Interpreter.lineNumber -= (lines.length - 1) * (i > 0 ? 1 : 0);
            lines.forEach(line => {
                //@ts-ignore
                if (line.trim() !== "" && !line.trim().startsWith("~")) new Statement(line.replaceAll("#", i)).run();
            });
        }
        Interpreter.lineNumber++;
    }

    private checkMethodName(methodName: string): boolean {
        return true;
    }
}

function customFunction (a, b) {
    if (checkFunctionNames(a) !== undefined) return "Function name must be unique.";
    
    let operations = b;
    operations = operations.split("\n").join("").split("~").join(" ").split(",");

    functions[a] = (x, y) => {
        operations.forEach(operation => {
            x = translator.exe(operation.replaceAll("#0", x).replaceAll("#1", y).split(" "));
        });
        let r = x;
        return assign(x, r);
    };
    
    return "New function '" + a + "' created.";
}