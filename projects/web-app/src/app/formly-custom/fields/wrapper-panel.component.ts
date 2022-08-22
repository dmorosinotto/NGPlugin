import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps, FormlyModule } from "@ngx-formly/core";

@Component({
    selector: "formly-wrapper-panel",
    standalone: true,
    imports: [CommonModule, FormlyModule],
    template: `
        <div class="panel">
            <label>
                {{ props.label }}:
                <span *ngIf="props.required" aria-hidden="true">*</span>
            </label>
            <ng-container #fieldComponent></ng-container>
            <div *ngIf="showError" class="validerror" [style.display]="'block'">
                <formly-validation-message [field]="field"></formly-validation-message>
            </div>
        </div>
    `,
    styles: [".panel { display: flex } ", ".validerror { color: red }"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperPanel extends FieldWrapper<FormlyFieldConfig<FormlyFieldProps>> {}
