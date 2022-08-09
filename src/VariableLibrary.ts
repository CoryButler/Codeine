import Interpreter from "./interpreter";
import Logger from "./logger";
import Variable from "./variable";

export default class VariableLibrary {
    private static _instance: VariableLibrary;
    public static readonly _tempFlag: string ="__temp__";
    private static _variables: Array<Variable> = [];
    private static _tempVariables: Array<Variable> = []

    constructor() {
        this.clear();
    }

    public clear(): void {
        VariableLibrary._variables = [new Variable(VariableLibrary._tempFlag, null)];
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
        return VariableLibrary._variables.slice().find(variable => variable.key === key);
    }

    public get(key: string): Variable {
        //@ts-ignore
        if (!isNaN(key.parseFloatStrict())) return new Variable(VariableLibrary._tempFlag, key.parseFloatStrict());
        if (key === VariableLibrary._tempFlag) return new Variable(VariableLibrary._tempFlag, 0);
        const variable = this.findVar(key);
        if (variable) return variable;
        return new Variable(key, 0);
    }

    public remove(key: string): void {
        const index = VariableLibrary._variables.slice().findIndex(variable => variable.key === key);
        if (index >= 0) VariableLibrary._variables.splice(index, 1);
        else Logger.log(`LINE ${Interpreter.lineNumber}: remove() - "${key}" does not exist.`);
    }

    public set(key: string, value: number): void {
        const variable = this.findVar(key);
        if (variable) variable.set(value);
        else Logger.log(`LINE ${Interpreter.lineNumber}: set() - "${key}" does not exist.`);
    }

    public setTemp() {
        VariableLibrary._tempVariables = VariableLibrary._variables.slice();
    }

    public resetFromTemp() {
        VariableLibrary._variables = VariableLibrary._tempVariables.slice();
    }
}