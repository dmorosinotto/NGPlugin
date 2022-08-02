import { ModuleWithProviders, NgModule } from "@angular/core";
import { SharedComponent } from "./shared.component";
import { SharedService } from "./shared.service";

@NgModule({
    declarations: [SharedComponent],
    imports: [],
    exports: [SharedComponent],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [SharedService],
        };
    }
}
