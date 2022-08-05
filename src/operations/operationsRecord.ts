import Add from "./add";
import Assign from "./assign";
import Deallocate from "./deallocate";
import Define from "./define";
import Divide from "./divide";
import Log from "./log";
import Loop from "./loop";
import Modulo from "./modulo";
import Mulitiply from "./multiply";
import Power from "./power";
import SquareRoot from "./squareRoot";
import Subtract from "./substract";

const operationsDictionary: Array<any> = [
    { key: new Add().key, op: Add },
    { key: new Assign().key, op: Assign },
    { key: new Deallocate().key, op: Deallocate },
    { key: new Define().key, op: Define },
    { key: new Divide().key, op: Divide},
    { key: new Log().key, op: Log },
    { key: new Loop().key, op: Loop },
    { key: new Modulo().key, op: Modulo},
    { key: new Mulitiply().key, op: Mulitiply},
    { key: new Power().key, op: Power },
    { key: new SquareRoot().key, op: SquareRoot},
    { key: new Subtract().key, op: Subtract }
];

console.log(operationsDictionary);

export default operationsDictionary;