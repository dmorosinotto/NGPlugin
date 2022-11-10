import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type ServiceTypeModel = {
    Service_Type: string;
    Description: string;
    // ig_pk: number;
};

export const formatServiceType = (m: ServiceTypeModel | null) => (m ? `${m.Service_Type} - ${m.Description}` : "");
export const getIDServiceType = (m: ServiceTypeModel | null) => m?.Service_Type ?? "";

@Component({
    selector: "n-service-type-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NServiceTypeLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NServiceTypeLookupComponent extends NBaseLookupComponent<ServiceTypeModel, ServiceTypeModel["Service_Type"]> {
    protected _txtFn = formatServiceType;
    protected _hidFn = getIDServiceType;

    constructor() {
        super();
        this.type = "ServiceType";
    }
}
