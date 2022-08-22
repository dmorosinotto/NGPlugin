import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";

@Component({
    selector: "app-lazy-formly",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormlyModule],
    template: `
        <p>lazy-formly works!</p>
        <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
            <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
            <button type="submit" [style.color]="form.invalid ? 'red' : 'black'">Submit</button>
        </form>
        <pre>
FORMLY
form={{ form.value | json }}
valid={{ form.valid }}
model={{ model | json }}
</pre>
    `,
    styles: [":host { display: block;  background-color: lightyellow; padding: 10px; border: 1px solid gray }"],
})
export class LazyFormlyComponent {
    constructor() {}
    //FORMLY
    public form = new FormGroup({});
    public model = {
        email: "Ciao@pippo.it",
        dpick: "1975-03-20Z",
    };
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
