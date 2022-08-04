import Variable from "../variable";
import Operation from "./operation";
import Statement from "../statement";
import Interpreter from "../interpreter";

export default class Loop implements Operation {
    readonly key: string = "&";
    readonly description: string = "divide";
    readonly example: string = "& 4 {\n...\n}; (runs statements on lines between braces 4 times)";
    execute(args: Array<Variable>): void {
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
}