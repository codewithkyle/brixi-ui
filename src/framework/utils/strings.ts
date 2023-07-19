interface String {
    ltrim(char: string): string;
}

// @ts-ignore
String.prototype.ltrim = function (char: string) {
    return this.replace(new RegExp(`^${char}+`), "");
};
