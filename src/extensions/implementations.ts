//@ts-ignore
String.prototype.parseFloatStrict = function (this: string): number {
    for (let i = 0; i < this.length; i++) {
        if (isNaN(parseFloat(this[i]))) return NaN;
    }
    return parseFloat(this);
}

//@ts-ignore
String.prototype.replaceAll = function (this: string, search: string, replacement: string): string {
    return this.replace(new RegExp(search, 'g'), replacement);
};

//@ts-ignore
String.prototype.splitFlag = "`";