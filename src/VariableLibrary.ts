import { Variable } from "./Variable";

export class VariableLibrary {
    private _variables: Array<Variable>;
    
    constructor() {
        this._variables = [];
    }

    add(key: string, value: number): void {
        const variable = this._variables.find(variable => variable.key === key);
        if (variable) console.error(`add() - "${key}" is already defined.`);
        else this._variables.push(new Variable(key, value));
    }

    get(key: string): Variable {
        console.log("e");
        if (parseFloat(key)) return new Variable("__temp__", parseFloat(key));
        console.log("f");
        const variable = this._variables.find(variable => variable.key === key);
        console.log("g");
        if (variable) return variable;
        else console.error(`get() - "${key}" does not exist.`);
        return new Variable("__error__", 0);
    }

    remove(key: string): void {
        const index = this._variables.findIndex(variable => variable.key === key);
        if (index >= 0) this._variables.splice(index, 1);
        else console.error(`remove() - "${key}" does not exist.`);
    }

    set(key: string, value: number): void {
        const index = this._variables.findIndex(variable => variable.key === key);
        if (index >= 0) this._variables[index].set(value);
        else console.error(`set() - "${key}" does not exist.`);
    }
}