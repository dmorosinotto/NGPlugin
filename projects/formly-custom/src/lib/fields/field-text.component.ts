import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FieldType, FieldTypeConfig, FormlyModule } from "@ngx-formly/core";

@Component({
    selector: "formly-field-text",
    standalone: true,
    imports: [FormlyModule, ReactiveFormsModule],
    template: ` <input type="text" [formControl]="formControl" [formlyAttributes]="field" /> `,
    styles: [".ng-invalid { border: 2px solid red }"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldText extends FieldType<FieldTypeConfig> {}
