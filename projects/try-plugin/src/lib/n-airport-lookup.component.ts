import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type AirportModel = {
    Airport: string;
    Airport_Icao: string;
    City: string;
    Country: string;
    Description: string;
    ig_pk: number;
};

@Component({
    selector: "n-airport-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NAirportLookupComponent extends NBaseLookupComponent<AirportModel, AirportModel["Airport"]> {
    protected _txtFn = (m: AirportModel) => (m ? `${m.City} - ${m.Description}` : "");
    protected _hidFn = (m: AirportModel) => m?.Airport;

    constructor() {
        super();
        this.type = "Airport";
    }
}
