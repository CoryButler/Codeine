export class Variable {
    public readonly key: string;
    private value: number;

    constructor(key: string, value: number = 0) {
        this.key = key;
        this.value = value;
    }

    get(): number {
        return this.value;
    }

    set(value: number): void {
        this.value = value;
    }
}