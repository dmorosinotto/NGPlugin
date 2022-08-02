import { Component } from "@angular/core";
import { SharedService } from "@app/shared";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>
        <router-outlet></router-outlet>
        <!-- <lib-shared></lib-shared> -->
        <app-try-plugin></app-try-plugin>
    `,
    styles: [],
})
export class AppComponent {
    title = "web-app";
    constructor(private shared: SharedService) {
        shared.log(this.title);
    }
}
