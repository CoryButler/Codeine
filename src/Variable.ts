export default class Variable {
    public readonly key: string;
    private value: number;

    constructor(key: string, value: number = 0) {
        this.key = key;
        this.value = value;
    }

    public get(): number {
        return this.value as number;
    }

    public set(value: number): void {
        if (this.value === null) return;
        this.value = value;
    }
}