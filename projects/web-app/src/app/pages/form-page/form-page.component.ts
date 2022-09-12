import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from "@angular/forms";
import { ValAccGenericLookupComponent, ValAccPluginComponent } from "@app/try-plugin";

@Component({
    selector: "app-form-page",
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ValAccPluginComponent, ValAccGenericLookupComponent],
    template: `
        <p>form-page works!</p>
        <p>uso <u>valacc-plugin</u> per abilitare utilizzo con <b>ReactiveForm</b> implementando <i>NG_VALUE_ACCESSOR</i> custom</p>
        <form [formGroup]="frm">
            <label>DATA: <app-valacc-plugin formControlName="data" [(model)]="m.d"></app-valacc-plugin></label>
            <label>BDAY: <app-valacc-plugin formControlName="bday" [(model)]="m.b"></app-valacc-plugin></label>
            <label
                >LOOKUP: <app-valacc-generic-lookup formControlName="aircraft" [(model)]="m.a" [(value)]="id"></app-valacc-generic-lookup
            ></label>
        </form>
        <label>FC: <app-valacc-plugin [formControl]="fc" [(value)]="utc"></app-valacc-plugin></label>
        <label>disabled=<input type="checkbox" (input)="toggleDisable()" /> {{ fc.disabled }} </label>
        <hr />
        <app-valacc-generic-lookup [(ngModel)]="id" [ngModelOptions]="{ updateOn: 'blur' }"></app-valacc-generic-lookup>
        <button type="reset" (click)="id = ''; utc = ''">RESET</button>
        <pre>
id={{ id }}
utc={{ utc }}
-----------------------
frm={{ frm.value | json }}
-----------------------
m={{ m | json }} 
-----------------------
fc={{ fc.value }}
</pre>
    `,
    styles: [":host {  background-color: lightgreen;  }", "input:disabled { background: #dddddd  }"],
    host: { class: "box" },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {
    constructor() {}

    public fc = new FormControl("1975-03-20Z");
    public frm = new FormGroup({
        data: new FormControl(),
        bday: this.fc,
        aircraft: new FormControl("101"),
    });
    public id!: string;
    public utc!: string;
    public m: any = {};

    toggleDisable() {
        if (this.fc.disabled) {
            this.fc.enable();
            this.frm.get("aircraft")?.enable();
        } else {
            this.fc.disable();
            this.frm.get("aircraft")?.disable();
        }
    }
}
