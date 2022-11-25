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
    NFlightQualificationLookupComponent,
    NFlightTypeLookupComponent,
    NServiceTypeLookupComponent,
    NCountryLookupComponent,
    NCustomersLookupComponent,
    NHandlersLookupComponent,
    NRegistrationLookupComponent,
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
        NFlightQualificationLookupComponent,
        NFlightTypeLookupComponent,
        NServiceTypeLookupComponent,
        NCountryLookupComponent,
        NCustomersLookupComponent,
        NHandlersLookupComponent,
        NRegistrationLookupComponent,
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
            <hr />
            <label>AIR: <n-airport-lookup [(value)]="air"></n-airport-lookup></label>
            <label>ID: <n-aircraft-lookup formControlName="aircraft" [(model)]="m.a" [(value)]="id"></n-aircraft-lookup></label>
            <label>FC: <n-date-picker [formControl]="fc" [(value)]="utc"></n-date-picker></label>
            <label>disabled=<input type="checkbox" (input)="toggleDisable()" /> {{ fc.disabled }} </label>
            <button type="reset" (click)="id = ''; utc = ''; air = ''">RESET</button>
        </form>
        <n-generic-lookup type="Aircraft" idField="Aircraft_Sub_Iata" [(ngModel)]="id"></n-generic-lookup>
        <hr />
        <h2>TEST n-XXX-lookup</h2>
        <label>AIRPORT: <n-airport-lookup [(value)]="v.p" [(model)]="m.p"></n-airport-lookup></label>
        <label>AIRCRAFT: <n-aircraft-lookup [(value)]="v.f" [(model)]="m.f"></n-aircraft-lookup></label>
        <label>FLIGHT QUAL: <n-flight-qualification-lookup [(value)]="v.fq" [(model)]="m.fq"></n-flight-qualification-lookup></label>
        <label>FLIGHT TYPE: <n-flight-type-lookup [(value)]="v.ft" [(model)]="m.ft"></n-flight-type-lookup></label>
        <label>SERVICE TYPE: <n-service-type-lookup [(value)]="v.st" [(model)]="m.st"></n-service-type-lookup></label>
        <label>COUNTRY: <n-country-lookup [(value)]="v.c" [(model)]="m.c"></n-country-lookup></label>
        <label>CUSTOMER: <n-customer-lookup [(value)]="v.C" [(model)]="m.C"></n-customer-lookup></label>
        <label>HANDLER: <n-handler-lookup [(value)]="v.h" [(model)]="m.h"></n-handler-lookup></label>
        <label>REGISTRATION: <n-registration-lookup [(value)]="v.r" [(model)]="m.r"></n-registration-lookup></label>
        <pre>
id={{ id }}
utc={{ utc }}
air={{ air }}
-----------------------
frm={{ frm.value | json }}
-----------------------
m={{ m | json }} 
v={{ v | json }} 
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
    public utc!: string | null;
    public air!: string | null;
    public m: any = {};
    public v: any = { fq: null, ft: null, st: null, c: null };

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
