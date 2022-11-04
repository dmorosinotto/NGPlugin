import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { LookupChangeEvent, NGenericLookupComponent } from "@app/try-plugin";

export interface LookupProps<M = any> extends FormlyFieldProps {
    lookup: string;
    idField: keyof M | ((m: M | null) => any);
    immutable?: boolean;
    formatter?: (m: M | null) => string;
    change?: (field: FormlyFieldConfig, event: LookupChangeEvent<M>) => void;
}

export interface FormlyLookupFieldConfig<M = any> extends FormlyFieldConfig<LookupProps<M>> {
    type: "lookup" | Type<FormlyFieldLookup>;
}

export function lookupField<M = any>(label: string, key: string, props: LookupProps<M>, required?: boolean): FormlyLookupFieldConfig {
    return {
        type: "lookup",
        key,
        props: { ...props, label, required },
    };
}

@Component({
    selector: "formly-field-lookup",
    // standalone: true,
    // imports: [CommonModule, FormlyModule, ReactiveFormsModule, NGenericLookupComponent],
    template: `
        <n-generic-lookup
            [formControl]="formControl"
            [formlyAttributes]="field"
            [(model)]="formState.lookup[$any(key)]"
            [type]="props.lookup"
            [idField]="props.idField"
            [formatter]="props.formatter"
            [immutable]="props.immutable"
        ></n-generic-lookup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep button {background-color: red}"],
})
export class FormlyFieldLookup extends FieldType<FieldTypeConfig<LookupProps>> {
    override defaultOptions = {
        props: {
            lookup: "", //MUST BE SPECIFIED IN FieldConfig
            idField: "", //MUST BE SPECIFIED IN FieldConfig
        },
    };
}
