import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
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
    // ig_pk: number;
};

export const formatAircraft = (m: AircraftModel | null) => (m ? `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}` : "");
export const getIDAircraft = "Aircraft_Sub_Iata" as const; //(m: AircraftModel | null) => m?.Aircraft_Sub_Iata ?? "";

@Component({
    selector: "n-aircraft-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NAircraftLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NAircraftLookupComponent extends NBaseLookupComponent<
    AircraftModel,
    AircraftModel[typeof getIDAircraft] //"Aircraft_Sub_Iata"
> {
    protected _txtFn = formatAircraft;
    protected _hidFn = getIDAircraft;

    constructor() {
        super();
        this.type = "Aircraft";
    }
}
