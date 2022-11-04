import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
    NAirportLookupComponent,
    NDatePickerComponent,
    NGenericLookupComponent,
    NAircraftLookupComponent,
    AircraftModel,
    formatAircraft,
    getIDAircraft,
    AirportModel,
    formatAirport,
} from "@app/try-plugin";

import { FormlyModule } from "@ngx-formly/core";
import { FormlyFieldAircraftLookup } from "./fields/field-aircraft.component";
import { FormlyFieldAirportLookup } from "./fields/field-airport.component";

import { FormlyFieldDate } from "./fields/field-date.component";
import { FormlyFieldLookup, LookupProps } from "./fields/field-lookup.component";
import { FormlyFieldText } from "./fields/field-text.component";
import { FormlyWrapperPanel } from "./fields/wrapper-panel.component";

@NgModule({
    declarations: [
        FormlyWrapperPanel,
        FormlyFieldText,
        FormlyFieldDate,
        FormlyFieldLookup,
        FormlyFieldAircraftLookup,
        FormlyFieldAirportLookup,
    ],
    imports: [
        //CONFIGURO FORMLY
        CommonModule,
        ReactiveFormsModule,
        NDatePickerComponent,
        NGenericLookupComponent,
        NAircraftLookupComponent,
        NAirportLookupComponent,
        FormlyModule.forRoot({
            wrappers: [{ name: "panel", component: FormlyWrapperPanel }],
            types: [
                { name: "text", component: FormlyFieldText, wrappers: ["panel"] },
                { name: "date", component: FormlyFieldDate, wrappers: ["panel"] },
                { name: "lookup", component: FormlyFieldLookup, wrappers: ["panel"] },
                // { name: "aircraft", component: FormlyFieldAircraftLookup, wrappers: ["panel"] },
                {
                    name: "aircraft",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Aircraft",
                            formatter: formatAircraft,
                            idField: getIDAircraft,
                        } as LookupProps<AircraftModel>,
                    },
                },
                // { name: "airport", component: FormlyFieldAirportLookup, wrappers: ["panel"] },
                {
                    name: "airport",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Airport",
                            formatter: formatAirport,
                            idField: "Airport_Icao",
                        } as LookupProps<AirportModel>,
                    },
                },
            ],
            validators: [{ name: "email", validation: Validators.email }],
            validationMessages: [
                { name: "email", message: "questa non e' una email" },
                { name: "required", message: "campo obbligatorio" },
            ],
        }),
    ],
    exports: [ReactiveFormsModule, FormlyModule],
})
export class FormlyCustomModule {}
