import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NBaseLookupComponent } from "./n-base-lookup.component";

export type HandlerModel = {
    HANDLER: string;
    DESCRIPTION: string;
    SHORT_DESCRIPTION: string;
    // ig_pk: number;
};

export const formatHandler = (m: HandlerModel | null) => (m ? `${m.SHORT_DESCRIPTION} - ${m.DESCRIPTION}` : "");
export const getIDHandler = "HANDLER" as const;

@Component({
    selector: "n-handler-lookup",
    templateUrl: "./n-base-lookup.component.html",
    styleUrls: ["./n-base-lookup.component.css"],
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NHandlersLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NHandlersLookupComponent extends NBaseLookupComponent<HandlerModel, HandlerModel[typeof getIDHandler]> {
    protected _txtFn = formatHandler;
    protected _hidFn = getIDHandler;

    constructor() {
        super();
        this.type = "Handler";
    }
}
