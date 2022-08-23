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
        dpick: "1975-03-20Z",
    };
    public state = { m: {} };
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
            key: "dpick",
            type: "date",
            templateOptions: {
                label: "Date picker",
                format: "ITA dd/MM/yy",
                // required: true,
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
