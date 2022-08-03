import { VariableLibrary } from "./VariableLibrary";
import { Add } from "./operations/add";
import { Operation } from "./operations/operation";
import { Statement } from "./statement";

export class Interpreter {
    private _operations: Array<Operation>;
    private _varLib: VariableLibrary;
    private _statements: Array<Statement>;

    constructor() {}

    public run(code: string): void {
        this._varLib = new VariableLibrary();
        code.split("\n").join("").split(";").forEach(line => { new Statement(line, this._varLib).run(); });
        //this._statements = this.parseCode(code);
        //this._statements.forEach(s => s.run());
        //console.log(new Add().execute([this._varLib.get("one"), this._varLib.get("two")]));
    }

    private parseCode(code: string): Array<Statement> {
        const statements: Array<Statement> = [];
        code.split(";").forEach(c => {
            statements.push(new Statement(c, this._varLib));
        });
        return statements;
    }
}