import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {
    private rnd: number;
    constructor() {
        this.rnd = Math.random();
        console.warn("ShareService ctor", this.rnd);
    }

    public log(from: string) {
        console.log("Shared log", from, this.rnd);
    }
}
