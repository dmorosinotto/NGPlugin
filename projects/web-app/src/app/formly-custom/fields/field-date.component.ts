import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import { ValAccPluginComponent } from "../../try-plugin/valacc-plugin.component";

interface DateProps extends FormlyFieldProps {
    format: string;
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
            [(model)]="formState.m[$any(key)]"
            [format]="props.format"
        ></app-valacc-plugin>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDate extends FieldType<FieldTypeConfig<DateProps>> {
    override defaultOptions = {
        props: {
            format: "dd-mm-yy" as const,
        },
    };
}
