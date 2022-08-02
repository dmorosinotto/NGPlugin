import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedComponent } from "@app/shared";

const routes: Routes = [{ path: "", pathMatch: "full", component: SharedComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
