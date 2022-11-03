import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { NAirportLookupComponent } from "@app/try-plugin";

@Component({
    selector: "formly-field-airport",
    // standalone: true,
    // imports: [CommonModule, FormlyModule, ReactiveFormsModule, NAirportLookupComponent],
    template: `
        <n-airport-lookup [formControl]="formControl" [formlyAttributes]="field" [(model)]="formState.lookup[$any(key)]"></n-airport-lookup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep button {background-color: yellow}"],
})
export class FormlyFieldAirportLookup extends FieldType<FieldTypeConfig> {}
