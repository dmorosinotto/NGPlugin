import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared";

import { AppRoutingModule } from "./pages/app-routing.module";
import { AppComponent } from "./app.component";
import { FormlyCustomModule } from "./formly-custom/formly-custom.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot(), FormlyCustomModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
