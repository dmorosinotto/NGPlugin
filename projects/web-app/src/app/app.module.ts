import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TryPluginComponent } from "./try-plugin/try-plugin.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot(), TryPluginComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
