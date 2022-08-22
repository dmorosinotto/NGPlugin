import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from "@app/shared";
import { FormlyFieldConfig } from "@ngx-formly/core";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>

        <!-- <lib-shared></lib-shared> -->
        <app-try-plugin [(value)]="birtday" [format]="'ITA dd/mm/yy'" [(model)]="bDate"></app-try-plugin>
        <h2>birtday: {{ birtday }}</h2>
        <h3>bDate: {{ bDate }}</h3>
        <button (click)="compleanno()">INIT MODEL</button>
        <button (click)="clearValue()">CLEAR</button>
        <hr />
        <form [formGroup]="frm">
            <label>DATA: <app-valacc-plugin formControlName="data" [(model)]="m.d" [(value)]="id"></app-valacc-plugin></label>
            <label>BDAY: <app-valacc-plugin formControlName="bday" [(model)]="m.b"></app-valacc-plugin></label>
        </form>
        <label>FC: <app-valacc-plugin [formControl]="fc"></app-valacc-plugin></label>
        <label>disabled=<input type="checkbox" (input)="toggleDisable()" /> {{ fc.disabled }} </label>
        <hr />
        <nav><a routerLink="/">HOME</a> | <a routerLink="formly">FORMLY</a></nav>
        <router-outlet></router-outlet>
        <pre>
frm={{ frm.value | json }}
-----------------------
m={{ m | json }} 
-----------------------
id={{ id }}
-----------------------
fc={{ fc.value }}
</pre>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = "web-app";
    birtday: string | null = "164502000000"; //"1975-03-20Z";
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
    toggleDisable() {
        if (this.fc.disabled) {
            this.fc.enable();
        } else {
            this.fc.disable();
        }
    }
    public fc = new FormControl("1975-03-20Z");
    public frm = new FormGroup({
        data: new FormControl(),
        bday: this.fc,
    });
    public id!: string;
    public m: any = {};
}
