import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type CountryModel = {
    Country: string;
    Description: string;
    // ig_pk: number;
};

export const formatCountry = (m: CountryModel | null) => (m ? `${m.Country} - ${m.Description}` : "");
export const getIDCountry = (m: CountryModel | null) => m?.Country ?? "";

@Component({
    selector: "n-country-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NCountryLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NCountryLookupComponent extends NBaseLookupComponent<CountryModel, CountryModel["Country"]> {
    protected _txtFn = formatCountry;
    protected _hidFn = getIDCountry;

    constructor() {
        super();
        this.type = "Country";
    }
}
