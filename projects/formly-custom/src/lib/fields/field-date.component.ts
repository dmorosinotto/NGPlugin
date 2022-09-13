import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { ValAccPluginComponent } from "@app/try-plugin";

interface DateProps extends FormlyFieldProps {
    format: string;
    immutable?: boolean;
}

export interface FormlyMultiCheckboxFieldConfig extends FormlyFieldConfig<DateProps> {
    type: "date" | Type<FormlyFieldDate>;
}

@Component({
    selector: "formly-field-date",
    standalone: true,
    imports: [CommonModule, FormlyModule, ReactiveFormsModule, ValAccPluginComponent],
    template: `
        <app-valacc-plugin
            [formControl]="formControl"
            [formlyAttributes]="field"
            [(model)]="formState.lookup[$any(key)]"
            [format]="props.format"
            [immutable]="props.immutable"
        ></app-valacc-plugin>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep input {background-color: red}"],
})
export class FormlyFieldDate extends FieldType<FieldTypeConfig<DateProps>> {
    override defaultOptions = {
        props: {
            format: "dd-mm-yy" as const,
        },
    };
}
