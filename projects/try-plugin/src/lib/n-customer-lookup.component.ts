import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type CustomerModel = {
    Code: number;
    CustomerUser: string;
    Country: string;
    CorporateName1: string;
    CorporateName2: string;
    DomesticVat: string;
    IsValid: boolean;
    // ig_pk: number;
};

export const formatCustomer = (m: CustomerModel | null) => (m ? `${m.CustomerUser} - ${m.CorporateName1}` : "");
export const getIDCustomer = (m: CustomerModel | null) => m?.Code ?? 0; // "Code" as const;

@Component({
    selector: "n-customer-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NCustomersLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NCustomersLookupComponent extends NBaseLookupComponent<CustomerModel, CustomerModel["Code"]> {
    protected _txtFn = formatCustomer;
    protected _hidFn = getIDCustomer;

    constructor() {
        super();
        this.type = "Customers";
    }
}
