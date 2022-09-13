import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { ValAccGenericLookupComponent } from "@app/try-plugin";

interface LookupProps extends FormlyFieldProps {
    type: string;
    idField: string;
    immutable?: boolean;
}

export interface FormlyMultiCheckboxFieldConfig extends FormlyFieldConfig<LookupProps> {
    type: "date" | Type<FormlyFieldLookup>;
}

@Component({
    selector: "formly-field-lookup",
    standalone: true,
    imports: [CommonModule, FormlyModule, ReactiveFormsModule, ValAccGenericLookupComponent],
    template: `
        <app-valacc-generic-lookup
            [formControl]="formControl"
            [formlyAttributes]="field"
            [(model)]="formState.lookup[$any(key)]"
            [type]="props.type"
            [idField]="props.idField"
            [immutable]="props.immutable"
        ></app-valacc-generic-lookup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep button {background-color: red}"],
})
export class FormlyFieldLookup extends FieldType<FieldTypeConfig<LookupProps>> {
    override defaultOptions = {
        props: {
            type: "Aircraft" as const,
            idField: "Aircraft_Sub_Iata" as const,
        },
    };
}
