import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

@Component({
    selector: "n-generic-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NGenericLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NGenericLookupComponent<M = any, K extends keyof M = keyof M> extends NBaseLookupComponent<M, M[K]> implements OnInit {
    protected _txtFn!: (model: M | null) => string;
    protected _hidFn!: keyof M | ((model: M | null) => M[K]);

    constructor() {
        super();
    }
    ngOnInit(): void {
        console.log(this.constructor.name, "on ngOnInit", this.idField, this.formatter);
        if (!this.idField) {
            console.error("CAN'T INIT NGenericLookupComponent MISSING IDFIELD!!!", this.idField);
        } else {
            this._hidFn = this.idField;
            if (typeof this.formatter === "function") {
                this._txtFn = this.formatter;
            } else {
                this._txtFn = (m) => ((typeof this._hidFn === "function" ? this._hidFn(m) : m?.[this._hidFn]) || "") as string;
            }
        }
        console.warn(this.constructor.name, "after ngOnInit SET FN", this._txtFn, this._hidFn);
    }

    @Input() idField!: K | ((model: M | null) => M[K]); // = "Aircraft_Sub_Iata";
    @Input() formatter?: (model: M | null) => string;
}
