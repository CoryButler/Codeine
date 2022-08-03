let variables = [];

const functions = {
    "+": (a, b) => { return add(a, b); },
    "=": (a, b) => { return assign(a, b); },
    "~": (a, b) => { return comment(a)},
    ">": (a, b) => { return customFunction(a, b)},
    "$": (a, b) => { return deallocate(a); },
    "@": (a, b) => { return define(a, b); },
    "/": (a, b) => { return divide(a, b); },
    "%": (a, b) => { return modulo(a, b); },
    "<": (a, b) => { return log(a); },
    "^": (a, b) => { return loop(a, b); },
    "*": (a, b) => { return multiply(a, b); },
    "_": (a, b) => { return squareRoot(a); },
    "-": (a, b) => { return subtract(a, b); }
}

let functionOperations = {}

function add (a, b) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    let r = val_a + val_b;
    return assign(a, r);
}

function assign (a, b) {
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    variables.forEach(v => {
        if (v.key === a) v.value = val_b;
    });
    return b;
}

function comment (a) {
    return a;
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

function deallocate (a) {
    if (getValueOfVar(a) === undefined) 
        return "ERROR: '" + a + "' is not a variable.";
    
    let toRemove;
    let length = variables.length;
    for (let i = 0; i < length; i++) {
        if (variables[i].key === a) toRemove = i;
    }
    variables.splice(toRemove, 1);

    return "Deallocated: " + a;
}

function define (a, b) {
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    if (getValueOfVar(a) !== undefined) 
        return "ERROR: '" + a + "' is already defined.";
    variables.push({ key: a, value: val_b });
    return variables[variables.length - 1].value;
}

function divide (a, b) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    let r = val_a / val_b;
    return assign(a, r);
}

function log (a) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    if (val_a === undefined) val_a = a;
    document.getElementById("log").value += val_a + "\n";
    return val_a;
}

function loop (a, b) {
    let operations = b;
    operations = operations.split("\n").join("").split("~").join(" ").split(",");

    for (let i = 0; i < a; i++) {
        operations.forEach(operation => {
            translator.exe(operation.replaceAll("#", i).split(" "));
        });
    }
}

function modulo (a, b) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    let r = ((val_b % val_a) + val_a) % val_a;
    return assign(a, r);
}

function multiply (a, b) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    let r = val_a * val_b;
    return assign(a, r);
}

function squareRoot (a) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let r = Math.sqrt(val_a);
    return assign(a, r);
}

function subtract (a, b) {
    let val_a = isNumber(a) ? a : getValueOfVar(a);
    let val_b = isNumber(b) ? b : getValueOfVar(b);
    let r = val_a - val_b;
    return assign(a, r);
}

function checkFunctionNames (a) {
    return functions[a];
}

function getValueOfVar (a) {
    let value;
    variables.forEach(v => {
        if (v.key === a) value = v.value;
    });
    return value;
}

function isNumber (a) {
    return !isNaN(parseFloat(a));
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let translator = new Translator();