import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TryPluginComponent } from "./try-plugin.component";
// import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [TryPluginComponent],
    imports: [CommonModule], // ReactiveFormsModule],
    exports: [TryPluginComponent], // ReactiveFormsModule],
})
export class TryPluginModule {}
