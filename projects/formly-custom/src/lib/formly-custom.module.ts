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
    formatFlightQualification,
    getIDFlightQualification,
    FlightQualificationModel,
    formatFlightType,
    getIDFlightType,
    FlightTypeModel,
    ServiceTypeModel,
    getIDServiceType,
    formatServiceType,
    CountryModel,
    formatCountry,
    getIDCountry,
    formatCustomer,
    getIDCustomer,
    CustomerModel,
    formatHandler,
    getIDHandler,
    HandlerModel,
    formatRegistration,
    getIDRegistration,
    RegistrationModel,
} from "@app/try-plugin";

import { FormlyModule } from "@ngx-formly/core";
import { FormlyFieldAircraftLookup } from "./fields/field-aircraft.component";
import { FormlyFieldAirportLookup } from "./fields/field-airport.component";

import { FormlyFieldDate } from "./fields/field-date.component";
import { FormlyFieldLookup, LookupBaseProps } from "./fields/field-lookup.component";
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
                        } as LookupBaseProps<AircraftModel>,
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
                        } as LookupBaseProps<AirportModel>,
                    },
                },
                {
                    name: "flightqualification",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "FlightQualification",
                            formatter: formatFlightQualification,
                            idField: getIDFlightQualification,
                        } as LookupBaseProps<FlightQualificationModel>,
                    },
                },
                {
                    name: "flighttype",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "FlightType",
                            formatter: formatFlightType,
                            idField: getIDFlightType,
                        } as LookupBaseProps<FlightTypeModel>,
                    },
                },
                {
                    name: "servicetype",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "ServiceType",
                            formatter: formatServiceType,
                            idField: getIDServiceType,
                        } as LookupBaseProps<ServiceTypeModel>,
                    },
                },
                {
                    name: "country",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Country",
                            formatter: formatCountry,
                            idField: getIDCountry,
                        } as LookupBaseProps<CountryModel>,
                    },
                },
                {
                    name: "customer",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Customers",
                            formatter: formatCustomer,
                            idField: getIDCustomer,
                        } as LookupBaseProps<CustomerModel>,
                    },
                },
                {
                    name: "handler",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Handler",
                            formatter: formatHandler,
                            idField: getIDHandler,
                        } as LookupBaseProps<HandlerModel>,
                    },
                },
                {
                    name: "registration",
                    extends: "lookup",
                    defaultOptions: {
                        props: {
                            lookup: "Registration",
                            formatter: formatRegistration,
                            idField: getIDRegistration,
                        } as LookupBaseProps<RegistrationModel>,
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
