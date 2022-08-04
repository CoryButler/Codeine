import Interpreter from "./interpreter";
import Logger from "./logger";
import Variable from "./variable";

export default class VariableLibrary {
    private static _instance: VariableLibrary;
    private static _tempFlag;
    private static _variables: Array<Variable> = [];

    constructor() {}

    public clear(): void {
        VariableLibrary._variables = [];
    }

    public static getInstance(): VariableLibrary {
        if (!VariableLibrary._instance)
            VariableLibrary._instance = new VariableLibrary();

        return VariableLibrary._instance;
    }

    public add(key: string, value: number): void {
        if (key === VariableLibrary._tempFlag) return;
        if (this.findVar(key)) Logger.log(`LINE ${Interpreter.lineNumber}: add() - "${key}" is already defined.`);
        else VariableLibrary._variables.push(new Variable(key, value));
    }

    private findVar(key: string): Variable {
        return VariableLibrary._variables.find(variable => variable.key === key);
    }

    public get(key: string): Variable {
        if (parseFloat(key)) return new Variable(VariableLibrary._tempFlag, parseFloat(key));        
        const variable = this.findVar(key);
        if (variable) return variable;
        return new Variable(key, 0);
    }

    public remove(key: string): void {
        const index = VariableLibrary._variables.findIndex(variable => variable.key === key);
        if (index >= 0) VariableLibrary._variables.splice(index, 1);
        else Logger.log(`LINE ${Interpreter.lineNumber}: remove() - "${key}" does not exist.`);
    }

    public set(key: string, value: number): void {
        const variable = this.findVar(key);
        if (variable) variable.set(value);
        else Logger.log(`LINE ${Interpreter.lineNumber}: set() - "${key}" does not exist.`);
    }
}