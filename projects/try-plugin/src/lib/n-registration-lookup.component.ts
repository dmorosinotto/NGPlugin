import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type RegistrationModel = {
    AviationType: string;
    Registration: string;
    AircraftSubIata: string;
    AircraftIcao: string;
    Seats: number;
    Mtow: number;
    AircraftDescription: string;
    AirlineDescription: string;
    CustomerDescription: string;
    InternalAirline: string;
    InternalCustomer: string;
    // ig_pk: number;
};

export const formatRegistration = (m: RegistrationModel | null) => (m ? `${m.Registration} - ${m.AircraftDescription}` : "");
export const getIDRegistration = "Registration" as const;

@Component({
    selector: "n-registration-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NRegistrationLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NRegistrationLookupComponent extends NBaseLookupComponent<RegistrationModel, RegistrationModel[typeof getIDRegistration]> {
    protected _txtFn = formatRegistration;
    protected _hidFn = getIDRegistration;

    constructor() {
        super();
        this.type = "Registration";
    }
}
