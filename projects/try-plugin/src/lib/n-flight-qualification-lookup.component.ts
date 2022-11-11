import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type FlightQualificationModel = {
    FLIGHT_QUALIFICATION: string;
    DESCRIPTION: string;
    LEG_TYPE: string;
    // ig_pk: number;
};

export const formatFlightQualification = (m: FlightQualificationModel | null) => (m ? `${m.FLIGHT_QUALIFICATION} - ${m.DESCRIPTION}` : "");
export const getIDFlightQualification = "FLIGHT_QUALIFICATION" as const;

@Component({
    selector: "n-flight-qualification-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NFlightQualificationLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NFlightQualificationLookupComponent extends NBaseLookupComponent<
    FlightQualificationModel,
    FlightQualificationModel[typeof getIDFlightQualification]
> {
    protected _txtFn = formatFlightQualification;
    protected _hidFn = getIDFlightQualification;

    constructor() {
        super();
        this.type = "FlightQualification";
    }
}
