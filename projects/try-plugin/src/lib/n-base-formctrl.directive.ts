import { ChangeDetectionStrategy, Directive, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject } from "rxjs";

@Directive(/*{
    selector: "n-base-formctrl",
    standalone: true,
    // templateUrl: "./n-date-picker.component.html", //IL TEMPLATE VA SPECIFICATO SULLA @Component OSSIA LA CLASSE EREDITATA
    // styleUrls: ["./n-date-picker.component.css"], //GLI STYLE VANNO SPECIFICATI SULLA @Component OSSIA LA CLASSE EREDITATA
    // providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NBaseFormCtrlComponent, multi: true }], //PURTROPPO QUESTO NON FUNZIONA SULLA ABSTRACT DEVO FARE IL PROVIDER NELLA CLASSE EREDITARE
    changeDetection: ChangeDetectionStrategy.OnPush,
}*/)
export abstract class NBaseFormCtrlComponent<V = string, M = any> implements ControlValueAccessor {
    constructor() {
        console.log(this.constructor.name, "on ctor");
    }
    writeValue(value: any): void {
        console.info(this.constructor.name, "writeValue", value);
        this.value = value;
    }
    private _OnChange?: (_: any) => void;
    registerOnChange(fn: (_: any) => void): void {
        console.info(this.constructor.name, "registerOnChange", fn);
        this._OnChange = fn;
    }
    private _OnTouhed?: () => void;
    registerOnTouched(fn: () => void): void {
        console.info(this.constructor.name, "registerOnTouched", fn);
        this._OnTouhed = fn;
    }
    protected _disabled = false;
    setDisabledState(isDisabled: boolean): void {
        console.info(this.constructor.name, "setDisabledState", isDisabled);
        //CALL OVERIDABLE LOGIC _onDisabling TO GET BACK disabled FLAG
        this._disabled = this._onDisabling(isDisabled);
    }

    protected _model?: M | null; //INTERNAL MODEL <==> value WITH FUNCS
    protected abstract _parseValueToModel(value: V | null): M | null;
    protected abstract _formatModelToValue(model: M | null): V | null;
    protected _onDisabling(disabled: boolean) {
        return disabled; //OVERIDES IF NEED CUSTOM LOGIC IN setDisabled
    }
    protected _onChanging(from: "value" | "model", changed: boolean) {
        return changed; //OVERRIDES IF NEED CUSTOM LOGIN IN _update
    }

    @Input() set value(value: V | null) {
        if (value === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (!this._issame(this._value, value)) {
            console.info(this.constructor.name, "SET VALUE", value);
            this._update("value", value);
        } else {
            console.info(this.constructor.name, value, "VALUE IS SAME");
        }
    }
    get value(): V | null {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<V | null>();
    private _value?: V | null;

    @Input() immutable?: boolean;
    protected _issame = (old: any, cur: any) => (this.immutable && old === cur) || JSON.stringify(old) == JSON.stringify(cur);

    protected _update(from: "value", what: V | null): void;
    protected _update(from: "model", what: M | null): void;
    protected _update(from: "value" | "model", what: unknown | null) {
        if (what === undefined) return; //DO NOTHING IF value IS NOT SPECIFIED
        const old = this._value!;
        //INSERNAL SET STATE KEEP IN SYNC _model <==> value
        if (from === "value") {
            var value = what as V;
            this._value = value;
            this._model = this._parseValueToModel(value);
        } else {
            var model = what as M;
            this._model = model;
            this._value = this._formatModelToValue(model);
        }
        //CALL OVERIDABLE LOGIC _onChangeing TO GET BACK changed FLAG
        const changed = this._onChanging(from, !this._issame(old, this._value));
        if (from !== "value") {
            console.info(this.constructor.name, "EMIT value CHANGE");
            this.valueChange.emit(this._value);
        }
        if (this._OnChange && changed) {
            console.info(this.constructor.name, "EMIT _OnChange", this._value);
            this._OnChange(this._value);
        }
        if (this._OnTouhed && changed) {
            console.info(this.constructor.name, "EMIT _OnTouhed");
            this._OnTouhed();
        }
    }
}
