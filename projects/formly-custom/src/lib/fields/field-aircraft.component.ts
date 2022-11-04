import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { NAircraftLookupComponent } from "@app/try-plugin";

interface AircraftLookupProps extends FormlyFieldProps {
    immutable?: boolean;
}

export interface FormlyAircraftLookupFieldConfig extends FormlyFieldConfig<AircraftLookupProps> {
    type: "aircraft" | Type<FormlyFieldAircraftLookup>;
}

@Component({
    selector: "formly-field-aircraft",
    // standalone: true,
    // imports: [CommonModule, FormlyModule, ReactiveFormsModule, NAircraftLookupComponent],
    template: `
        <n-aircraft-lookup
            [formControl]="formControl"
            [formlyAttributes]="field"
            [(model)]="formState.lookup[$any(key)]"
            [immutable]="props.immutable"
        ></n-aircraft-lookup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep button {background-color: pink}"],
})
export class FormlyFieldAircraftLookup extends FieldType<FieldTypeConfig<AircraftLookupProps>> {
    override defaultOptions = {
        props: {
            immutable: true,
        },
    };
}
