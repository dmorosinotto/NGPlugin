import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared";
import { FormlyCustomModule } from "@app/formly-custom";

import { AppRoutingModule } from "./pages/app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot(), FormlyCustomModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
