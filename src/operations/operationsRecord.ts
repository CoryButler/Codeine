import { Operation } from "./operation";
import { Add } from "./add";

const operationsDictionary: Array<any> = [
    { key: "+", op: new Add() }
];

export { operationsDictionary };