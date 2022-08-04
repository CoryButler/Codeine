//@ts-ignore
String.prototype.replaceAll = function (this: string, search: string, replacement: string) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//@ts-ignore
String.prototype.splitFlag = "`";