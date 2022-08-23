import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SharedService } from "@app/shared";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>
        <!-- <lib-shared></lib-shared> -->
        <nav>
            <a routerLink="/">HOME</a> | <a routerLink="plugin">PLUGIN</a> | <a routerLink="form">FORM</a> |
            <a routerLink="formly">FORMLY</a>
        </nav>
        <hr />
        <router-outlet></router-outlet>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = "web-app";

    constructor(private shared: SharedService) {
        this.shared.log(this.title);
    }
}
