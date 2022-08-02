import { Component } from "@angular/core";
import { SharedService } from "@app/shared";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>
        <router-outlet></router-outlet>
        <!-- <lib-shared></lib-shared> -->
        <app-try-plugin [(valueUTC)]="birtday" [format]="'ITA dd/mm/yy'"></app-try-plugin>
        <h2>birtday: {{ birtday }}</h2>
    `,
    styles: [],
})
export class AppComponent {
    title = "web-app";
    birtday = "1975-03-20Z";
    constructor(private shared: SharedService) {
        shared.log(this.title);
    }
}
