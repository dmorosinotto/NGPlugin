import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type AircraftModel = {
    Aircraft_Icao: string;
    Aircraft_Sub_Iata: string;
    Description: string;
    Seats: number;
    Mtow: number;
    Icao_Category: string;
    Width: number;
    Length: number;
    Height: number;
    Holds: string;
    AirframeType: string;
    IsHelicopter: boolean;
    LandingGearType: string;
    IsWithoutWheels: boolean;
    Selected: boolean;
};

@Component({
    selector: "n-aircraft-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NAircraftLookupComponent extends NBaseLookupComponent<AircraftModel, AircraftModel["Aircraft_Sub_Iata"]> {
    protected _txtFn = (m: AircraftModel) => (m ? `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}` : "");
    protected _hidFn = (m: AircraftModel) => m?.Aircraft_Sub_Iata;

    constructor() {
        super();
        this.type = "Aircraft";
    }
}
