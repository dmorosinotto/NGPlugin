import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

//ngDebug PER ELIMINARE console.log IN PROD
(window as any).ngDebug = (function (b) {
    var _debug = !!b;
    var _LOG = window.console.log;
    var _NOLOG = function () {};
    if (!_debug) window.console.log = _NOLOG;
    //@ts-ignore
    return function (b?: boolean) {
        if (b === undefined) return _debug;
        if (!b === _debug) {
            _debug = !!b;
            window.console.log = _debug ? _LOG : _NOLOG;
            window.console.info = _debug ? _LOG : _NOLOG;
        }
    };
})(!environment.production);
