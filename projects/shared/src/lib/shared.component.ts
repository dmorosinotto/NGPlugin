import { Component, OnInit } from "@angular/core";
import { SharedService } from "./shared.service";

@Component({
    selector: "lib-shared",
    template: ` <p>shared works!</p> `,
    styles: [],
})
export class SharedComponent implements OnInit {
    constructor(shared: SharedService) {
        shared.log("SharedComponent");
    }

    ngOnInit(): void {}
}
