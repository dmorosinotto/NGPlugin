import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type FlightTypeModel = {
    GA_FLIGHT_TYPE: string;
    DESCRIPTION: string;
    // ig_pk: number;
};

export const formatFlightType = (m: FlightTypeModel | null) => (m ? `${m.GA_FLIGHT_TYPE} - ${m.DESCRIPTION}` : "");
export const getIDFlightType = "GA_FLIGHT_TYPE" as const;

@Component({
    selector: "n-flight-type-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NFlightTypeLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NFlightTypeLookupComponent extends NBaseLookupComponent<FlightTypeModel, FlightTypeModel[typeof getIDFlightType]> {
    protected _txtFn = formatFlightType;
    protected _hidFn = getIDFlightType;

    constructor() {
        super();
        this.type = "FlightType";
    }
}
