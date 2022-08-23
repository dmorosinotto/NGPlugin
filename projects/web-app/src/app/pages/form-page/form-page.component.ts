import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { ValAccPluginComponent } from "../../try-plugin/valacc-plugin.component";

@Component({
    selector: "app-form-page",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ValAccPluginComponent],
    template: `
        <p>form-page works!</p>
        <p>uso <u>valacc-plugin</u> per abilitare utilizzo con <b>ReactiveForm</b> implementando <i>NG_VALUE_ACCESSOR</i> custom</p>
        <form [formGroup]="frm">
            <label>DATA: <app-valacc-plugin formControlName="data" [(model)]="m.d" [(value)]="id"></app-valacc-plugin></label>
            <label>BDAY: <app-valacc-plugin formControlName="bday" [(model)]="m.b"></app-valacc-plugin></label>
        </form>
        <label>FC: <app-valacc-plugin [formControl]="fc"></app-valacc-plugin></label>
        <label>disabled=<input type="checkbox" (input)="toggleDisable()" /> {{ fc.disabled }} </label>
        <hr />

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
    styles: [":host {  background-color: lightgreen;  }"],
    host: { class: "box" },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {
    constructor() {}

    public fc = new FormControl("1975-03-20Z");
    public frm = new FormGroup({
        data: new FormControl(),
        bday: this.fc,
    });
    public id!: string;
    public m: any = {};

    toggleDisable() {
        if (this.fc.disabled) {
            this.fc.enable();
        } else {
            this.fc.disable();
        }
    }
}
