import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedComponent } from "@app/shared";
import { FormPageComponent } from "./form-page/form-page.component";
import { PluginPageComponent } from "./plugin-page/plugin-page.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: SharedComponent },
    { path: "form", component: FormPageComponent },
    // { path: "form", loadComponent: () => import("./form-page/form-page.component").then((m) => m.FormPageComponent) },
    { path: "plugin", pathMatch: "full", component: PluginPageComponent },
    // { path: "plugin", loadComponent: () => import("./plugin-page/plugin-page.component").then((m) => m.PluginPageComponent) },
    { path: "formly", loadComponent: () => import("./lazy-formly/lazy-formly.component").then((m) => m.FormlyPageComponent) },
    // { path: "formly", loadChildren: () => import("./lazy-formly/lazy-formly.component").then((mod) => mod.FormlyLazyModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
