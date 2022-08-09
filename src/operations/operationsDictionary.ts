import Add from "./add";
import Assign from "./assign";
import Comment from "./comment";
import Deallocate from "./deallocate";
import Define from "./define";
import Divide from "./divide";
import Log from "./log";
import Loop from "./loop";
import MethodCreate from "./methodCreate";
import Modulo from "./modulo";
import Mulitiply from "./multiply";
import Power from "./power";
import NthRoot from "./nthRoot";
import Subtract from "./substract";
import Logger from "../logger";

export default class OperationsDictionary {
    private static _instance: OperationsDictionary;

    private _dict: Array<any> = [
        { key: new Add().key, op: Add },
        { key: new Assign().key, op: Assign },
        { key: new Comment().key, op: Comment },
        { key: new Deallocate().key, op: Deallocate },
        { key: new Define().key, op: Define },
        { key: new Divide().key, op: Divide},
        { key: new Log().key, op: Log },
        { key: new Loop().key, op: Loop },
        { key: new MethodCreate().key, op: MethodCreate },
        { key: new Modulo().key, op: Modulo},
        { key: new Mulitiply().key, op: Mulitiply},
        { key: new Power().key, op: Power },
        { key: new NthRoot().key, op: NthRoot},
        { key: new Subtract().key, op: Subtract }
    ];

    private _defaultDict: Array<any> = this._dict.slice();
    private _tempDict: Array<any> = this._dict.slice();

    public static getInstance(): OperationsDictionary {
        if (!OperationsDictionary._instance)
            OperationsDictionary._instance = new OperationsDictionary();

        return OperationsDictionary._instance;
    }

    public clear() { this._dict = this._defaultDict.slice(); }

    public dictionary() { return this._dict.slice(); }

    public find(key: string) { return this._dict.find(opDict => opDict.key === key); }

    public isCustomMethod(key: string): boolean { return this._dict.slice(this._defaultDict.length).some(op => op.key === key); }

    public push(obj: any) {
        this._dict.push(obj);
    }

    public removeSpecific(key: string): void {
        const index = this._dict.findIndex(op => op.key === key);
        if (index < 0) {
            Logger.log(`Could not delete "${key}" because it does not exist.`);
            return;
        }
        this._dict.splice(index, 1);
    }

    public setTemp() { this._tempDict = this._dict.slice(); }
    public resetFromTemp() { this._dict = this._tempDict.slice(); }
}