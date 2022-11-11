import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type AirportModel = {
    Airport: string;
    Airport_Icao: string;
    City: string;
    Country: string;
    Description: string;
    // ig_pk: number;
};

export const formatAirport = (m: AirportModel | null) => (m ? `${m.City} - ${m.Description}` : "");
export const getIDAirport = "Airport" as const;

@Component({
    selector: "n-airport-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NAirportLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NAirportLookupComponent extends NBaseLookupComponent<AirportModel, AirportModel[typeof getIDAirport]> {
    protected _txtFn = formatAirport;
    protected _hidFn = getIDAirport;

    constructor() {
        super();
        this.type = "Airport";
    }
}
