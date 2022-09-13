import { NgModule } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";

import { FormlyFieldDate } from "./fields/field-date.component";
import { FormlyFieldLookup } from "./fields/field-lookup.component";
import { FormlyFieldText } from "./fields/field-text.component";
import { FormlyWrapperPanel } from "./fields/wrapper-panel.component";

@NgModule({
    imports: [
        //CONFIGURO FORMLY
        ReactiveFormsModule,
        // FormlyFieldText,
        // FormlyFieldDate,
        // FormlyWrapperPanel,
        FormlyModule.forRoot({
            wrappers: [{ name: "panel", component: FormlyWrapperPanel }],
            types: [
                { name: "text", component: FormlyFieldText, wrappers: ["panel"] },
                { name: "date", component: FormlyFieldDate, wrappers: ["panel"] },
                { name: "lookup", component: FormlyFieldLookup, wrappers: ["panel"] },
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
