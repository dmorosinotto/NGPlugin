import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

@Component({
    selector: "app-lazy-formly",
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
export class LazyFormlyComponent {
    constructor() {}
    //FORMLY
    public form = new FormGroup({});
    public model = {
        email: "Ciao@pippo.it",
        from: "1975-03-20Z",
        // aircraft: "100",
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
                    if ((event.model as Date).getFullYear() != 2022) {
                        //EQUIVALE A this.state.lookup.to = new Date();
                        field.options!.formState.lookup.to = new Date();
                    }
                },
            },
        },
        {
            key: "aircraft",
            type: "lookup",
            templateOptions: {
                label: "Select aircraft",
                required: true,
                // immutable: true,
                change: (field, event) => {
                    console.group("%cLOOKUP SELECTED change " + field.key, "background-color: cyan");
                    console.log(event);
                    console.groupEnd();
                },
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
