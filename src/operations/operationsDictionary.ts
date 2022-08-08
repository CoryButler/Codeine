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

let operationsDictionary: Array<any> = [
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

const defaultOperationsDictionary: Array<any> = operationsDictionary.slice();
let tempOperactionsDictionary: Array<any> = operationsDictionary.slice();

function resetOperationsDictionary() { operationsDictionary = defaultOperationsDictionary.slice(); }

function isCustomMethod(key: string): boolean { return operationsDictionary.slice(defaultOperationsDictionary.length).some(op => op.key === key); }

function removeSpecific(key: string): void {
    const index = operationsDictionary.findIndex(op => op.key === key);
    operationsDictionary.splice(index, 1);
}

function setTempOperationsDictionary() { tempOperactionsDictionary =  operationsDictionary.slice(); }
function restoreTempOperationsDictionary() { operationsDictionary = tempOperactionsDictionary.slice(); }

export { operationsDictionary, resetOperationsDictionary, isCustomMethod, removeSpecific, setTempOperationsDictionary, restoreTempOperationsDictionary };