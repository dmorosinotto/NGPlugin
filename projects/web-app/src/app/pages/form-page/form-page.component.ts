import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from "@angular/forms";
import {
    NGenericLookupComponent,
    NDatePickerComponent,
    NAircraftLookupComponent,
    NAirportLookupComponent,
    AircraftModel,
    AirportModel,
} from "@app/try-plugin";

@Component({
    selector: "app-form-page",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NDatePickerComponent,
        NGenericLookupComponent,
        NAircraftLookupComponent,
        NAirportLookupComponent,
    ],
    template: `
        <p>form-page works!</p>
        <p>uso <u>valacc-plugin</u> per abilitare utilizzo con <b>ReactiveForm</b> implementando <i>NG_VALUE_ACCESSOR</i> custom</p>
        <form [formGroup]="frm">
            <label
                >DATA: <n-date-picker type="Aircraft" idField="Aircraft_Sub_Iata" formControlName="data" [(model)]="m.d"></n-date-picker
            ></label>
            <label
                >BDAY: <n-date-picker type="Aircraft" idField="Aircraft_Sub_Iata" formControlName="bday" [(model)]="m.b"></n-date-picker
            ></label>
            <label
                >LOOKUP:
                <n-generic-lookup
                    type="Airport"
                    idField="Airport"
                    formControlName="lookup"
                    [formatter]="formatIcao"
                    [(model)]="m.port"
                    [(value)]="air"
                ></n-generic-lookup
            ></label>
            <label>AIRPORT: <n-airport-lookup [(value)]="air"></n-airport-lookup></label>
            <label>AIRCRAFT: <n-aircraft-lookup formControlName="aircraft" [(model)]="m.a" [(value)]="id"></n-aircraft-lookup></label>
        </form>
        <label>FC: <n-date-picker [formControl]="fc" [(value)]="utc"></n-date-picker></label>
        <label>disabled=<input type="checkbox" (input)="toggleDisable()" /> {{ fc.disabled }} </label>
        <hr />
        <n-generic-lookup type="Aircraft" idField="Aircraft_Sub_Iata" [(ngModel)]="id"></n-generic-lookup>
        <button type="reset" (click)="id = ''; utc = ''; air = ''">RESET</button>
        <pre>
id={{ id }}
utc={{ utc }}
air={{ air }}
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
        lookup: new FormControl(),
        aircraft: new FormControl("101"),
    });
    public id!: string | null;
    public utc!: string;
    public air!: string | null;
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

    formatMe(m: AircraftModel | null) {
        return m ? `${m.Aircraft_Icao} - ${m.Description}` : "";
    }
    formatIcao(m: AirportModel | null) {
        return m?.Airport_Icao ?? "";
    }
}
