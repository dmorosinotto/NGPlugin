import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { FormlyLookupFieldConfig, lookupCustomField, lookupField } from "@app/formly-custom";
import { AircraftModel, AirportModel } from "@app/try-plugin";

@Component({
    selector: "app-formly-page",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormlyModule],
    template: `
        <p>lazy-formly works!</p>
        <p>
            uso <b>formly-custom</b> per registare types: <i>text</i> e <i>date</i> che usa <u>valacc-plugin</u> ossia custom
            NG_VALUE_ACCESSOR per interagire con formly [FormControl]
        </p>
        <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
            <formly-form [form]="form" [fields]="fields" [model]="model" [options]="options"></formly-form>
            <button type="submit" [style.color]="form.invalid ? 'red' : 'black'">Submit</button>
        </form>
        <pre>
FORMLY
form={{ form.value | json }}
valid={{ form.valid }}
model={{ model | json }}
state={{ state | json }}
</pre>
    `,
    styles: [":host {  background-color: lightyellow; }"],
    host: { class: "box" },
})
export class FormlyPageComponent {
    constructor() {}
    //FORMLY
    public form = new FormGroup({});
    public model = {
        email: "Ciao@pippo.it",
        from: "1975-03-20Z",
        aereo: "101",
        scalo: "VCE",
        // airport: "LIPZ",
    };
    public state = {
        lookup: {
            to: new Date(2022, 8 - 1, 15),
        },
    };
    public options: FormlyFormOptions = { formState: this.state };
    public fields: FormlyFieldConfig[] = [
        {
            key: "email",
            type: "text",
            templateOptions: {
                label: "Email address",
                placeholder: "Digita email",
                required: true,
            },
            validators: {
                validation: ["email"],
            },
        },
        {
            key: "from",
            type: "date",
            templateOptions: {
                label: "From date",
                format: "ITA dd/MM/yy",
                immutable: true,
                // required: true,
            },
        },
        {
            key: "to",
            type: "date",
            templateOptions: {
                label: "To picker",
                // format: "dd/mm/yy",
                required: true,
                change: (field, event) => {
                    console.warn("HANDLE change ", field.key, event);
                    if ((event?.model as Date)?.getFullYear() != 2022) {
                        //EQUIVALE A this.state.lookup.to = new Date();
                        field.options!.formState.lookup.to = new Date();
                    }
                },
            },
        },
        lookupField("standard", "Airport", "standard lookup -> Airport"),
        lookupField("paese", "Country", "scegli paese standard -> Country", {
            formatter: (m) => m?.Description ?? "",
            change(field, event) {
                console.log(field.key, "=", event.value, "->", event.model);
            },
        }),
        lookupCustomField<number>("custom", "MIOTPO", "custom lookup", {
            formatter(m) {
                return m?.toString() || "";
            },
            idField(m) {
                return JSON.stringify(m);
            },
            url: "/lookup/YourCustomAPI_GetListNumbers",
            urlAutocomplete: "/lookup/YourCustomAPI_GetNumberByID",
            getCustomColumns(colsToModify, type?) {
                colsToModify.push({ headerText: "n", key: "ID", width: "100%" });
            },
        }),
        lookupField("aereo", "Aircraft", "Select generic aereo", {
            // lookup: "Aircraft",
            // idField: "Aircraft_Sub_Iata",
            // formatter: (m) => `${m?.Aircraft_Icao} - ${m?.Description}`,
            idField(model) {},
            formatter: (m) => m?.Aircraft_Icao || "",
            change(field, event) {
                console.log(event.model, event.value);
            },
        }),
        /*
        {
            key: "aircraft",
            type: "lookup",
            templateOptions: {
                label: "Select generic aircraft",
                // required: false,
                lookup: "Aircraft",
                idField: "Aircraft_Sub_Iata",
                formatter: (m: any) => `${m.Aircraft_Icao} - ${m.Description}`,
                // immutable: true,
                change: (field, event) => {
                    console.group("%cLOOKUP SELECTED change " + field.key, "background-color: pink");
                    console.log(event);
                    console.groupEnd();
                },
            },
        },
        */
        {
            key: "scalo",
            type: "lookup",
            props: {
                label: "Select generic scalo",
                // required: false,
                lookup: "Airport",
                idField: "Airport_Icao",
                // immutable: true,
                change: (field, event) => {
                    console.group("%cLOOKUP SELECTED change " + field.key, "background-color: cyan");
                    console.error("CHANGE", field.key, event, "model=", JSON.stringify(event.model)); //, "field=", field);
                    console.groupEnd();
                    //ESEMPIO DI SINCRONIZZAZIONE CAMPO scalo -> airport
                    // field.model.airport = event.model?.Airport_Icao;
                    // field.options!.formState.lookup.airport = event.model;
                    // (this.state.lookup as any)["airport"] = event.model;
                    // console.info("AFTER CHANGE SYNC", JSON.stringify(field.model));
                },
            },
        } as FormlyLookupFieldConfig<AirportModel>,
        // lookupField("Airport", "Select generic airport", "airport", { lookup: "Airport", idField: "Airport"}),
        {
            key: "aereo",
            type: "aircraft",
            templateOptions: {
                label: "Select aereo",
                required: true,
                // immutable: true,
                change: (field, event) => console.warn("AEREO SELECTED", field.key, "->", event),
            },
        },
        {
            key: "airport", //"scalo",
            type: "airport", //"Airport_Icao"
            templateOptions: {
                label: "Select airport ICAO",
                required: true,
                // immutable: true,
                change: (field, event) => console.error("AIRPORT SELECTED", field.key, "->", event),
            },
        },
        {
            key: "flightqual",
            type: "flightqualification",
            templateOptions: {
                label: "Select FlightQualification",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("FlightQualification SELECTED", field.key, "->", event),
            },
        },
        {
            key: "flighttype",
            type: "flighttype",
            templateOptions: {
                label: "Select FlightType",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("FlightType SELECTED", field.key, "->", event),
            },
        },
        {
            key: "servicetype",
            type: "servicetype",
            templateOptions: {
                label: "Select ServiceType",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("ServiceType SELECTED", field.key, "->", event),
            },
        },
        {
            key: "country",
            type: "country",
            templateOptions: {
                label: "Select Country",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("Country SELECTED", field.key, "->", event),
            },
        },
        {
            key: "customer",
            type: "customer",
            templateOptions: {
                label: "Select Customers",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("Customers SELECTED", field.key, "->", event),
            },
        },
        {
            key: "handler",
            type: "handler",
            templateOptions: {
                label: "Select Handler",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("Handler SELECTED", field.key, "->", event),
            },
        },
        {
            key: "registration",
            type: "registration",
            templateOptions: {
                label: "Select Registration",
                // required: true,
                // immutable: true,
                // change: (field, event) => console.error("Registration SELECTED", field.key, "->", event),
            },
        },
    ];

    onSubmit(model: any) {
        console.log(model);
        if (this.form.valid) {
            alert(JSON.stringify(model));
        } else {
            alert("FORM INVALID");
        }
    }
}

// //IN ALTERNATIVA AGLI standalone COMPONENT
// const routes: Routes = [{ path: "", component: FormlyPageComponent }];
// @NgModule({
//     declarations: [FormlyPageComponent],
//     imports: [CommonModule, ReactiveFormsModule, FormlyModule, RouterModule.forChild(routes)],
// })
// export class FormlyLazyModule {}
