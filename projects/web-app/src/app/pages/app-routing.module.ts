import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedComponent } from "@app/shared";
import { FormPageComponent } from "./form-page/form-page.component";
import { PluginPageComponent } from "./plugin-page/plugin-page.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: SharedComponent },
    { path: "form", pathMatch: "full", component: FormPageComponent },
    { path: "plugin", pathMatch: "full", component: PluginPageComponent },
    { path: "formly", loadComponent: () => import("./lazy-formly/lazy-formly.component").then((mod) => mod.LazyFormlyComponent) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
