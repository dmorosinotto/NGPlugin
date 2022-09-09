import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TryGenericLookupComponent, TryPluginModule } from "@app/try-plugin";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-plugin-page",
    standalone: true,
    imports: [CommonModule, TryPluginModule, TryGenericLookupComponent, FormsModule],
    template: `
        <p>plugin-page works!</p>
        <p>uso <u>app-try-plugin</u> per inglobare JQUERY con <b>format</b> + <i>[(two-way)]</i> binding su <b>value</b> e <b>model</b></p>
        <app-try-plugin [(value)]="birtday" [format]="'ITA dd/mm/yy'" [(model)]="bDate"></app-try-plugin>
        <h2>birtday: {{ birtday }}</h2>
        <h3>bDate: {{ bDate }}</h3>
        <button (click)="compleanno()">INIT MODEL</button>
        <button (click)="clearValue()">CLEAR</button>
        <hr />
        <p>uso <u>try-generic-lookup</u> per provare plugin JQUERY NAITEC: <i>genericLookup</i></p>
        <try-generic-lookup [(model)]="aircraft" [(value)]="idair"></try-generic-lookup>
        <pre>
            IDAIR = {{ idair }}
            aircraft = {{ aircraft | json }}
        </pre
        >
        <label>idair:<input [(ngModel)]="idair" [ngModelOptions]="{ updateOn: 'blur' }" /></label>
    `,
    styles: [":host { background-color: lightcyan; }"],
    host: { class: "box" },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginPageComponent {
    constructor() {}
    birtday: string | null = "164502000000"; //"1975-03-20Z";
    bDate!: Date | null;
    compleanno() {
        this.bDate = new Date(1975, 3 - 1, 20);
    }
    clearValue() {
        this.birtday = null;
        this.idair = null;
    }
    idair?: string | null = "100";
    aircraft: any;
}
