import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormlyCustomModule } from "./formly-custom/formly-custom.module";

import { TryPluginComponent } from "./try-plugin/try-plugin.component";
import { ValAccPluginComponent } from "./valacc-plugin/valacc-plugin.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule.forRoot(),
        TryPluginComponent,
        ReactiveFormsModule,
        ValAccPluginComponent,
        FormlyCustomModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
