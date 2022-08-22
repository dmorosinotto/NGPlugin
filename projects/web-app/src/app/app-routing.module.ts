import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedComponent } from "@app/shared";

const routes: Routes = [
    { path: "", pathMatch: "full", component: SharedComponent },
    { path: "formly", loadComponent: () => import("./lazy-formly/lazy-formly.component").then((mod) => mod.LazyFormlyComponent) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
