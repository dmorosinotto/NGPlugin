import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SharedService } from "@app/shared";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>
        <router-outlet></router-outlet>
        <!-- <lib-shared></lib-shared> -->
        <app-try-plugin [(value)]="birtday" [format]="'ITA dd/mm/yy'" [(model)]="bDate"></app-try-plugin>
        <h2>birtday: {{ birtday }}</h2>
        <h3>bDate: {{ bDate }}</h3>
        <button (click)="compleanno()">INIT MODEL</button>
        <button (click)="clearValue()">CLEAR</button>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = "web-app";
    birtday!: string | null; //= "164502000000"; //"1975-03-20Z";
    bDate!: Date | null;
    constructor(private shared: SharedService) {
        shared.log(this.title);
    }
    compleanno() {
        this.bDate = new Date(1975, 3 - 1, 20);
    }
    clearValue() {
        this.birtday = null;
    }
}
