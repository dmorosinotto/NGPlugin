import { Component, OnInit } from "@angular/core";
import { SharedService } from "./shared.service";

@Component({
    selector: "lib-shared",
    template: ` <p>shared works! <u>lib-shared</u> component dichiarato nella <i>@app/shared</i> esterna <b>lib</b></p>`,
    styles: [":host  { background-color: lightgray; display: block;}", "p {font-size: 1.2rem }"],
})
export class SharedComponent implements OnInit {
    constructor(shared: SharedService) {
        shared.log("SharedComponent");
    }

    ngOnInit(): void {}
}
