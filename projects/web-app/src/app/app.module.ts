import { NgModule, InjectionToken, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "@app/shared";
import { FormlyCustomModule } from "@app/formly-custom";

import { AppRoutingModule } from "./pages/app-routing.module";
import { AppComponent } from "./app.component";

// InjectionTokens
export const NG_INIT_URL = new InjectionToken<string>("ngInitUrl");
export function initApp(ngInitUrl: string) {
    return function () {
        return fetch(ngInitUrl, { method: "GET" }).then((res: any) => {
            return res.json();
        });
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot(), FormlyCustomModule],
    providers: [
        { provide: NG_INIT_URL, useValue: "/nginit" },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initApp,
            deps: [NG_INIT_URL],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
