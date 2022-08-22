import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldType, FieldTypeConfig, FormlyModule } from "@ngx-formly/core";
import { ValAccPluginComponent } from "../../valacc-plugin/valacc-plugin.component";

@Component({
    selector: "formly-field-date",
    standalone: true,
    imports: [FormlyModule, ReactiveFormsModule, ValAccPluginComponent],
    template: ` <app-valacc-plugin [formControl]="formControl" [formlyAttributes]="field"></app-valacc-plugin> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDate extends FieldType<FieldTypeConfig> {}
