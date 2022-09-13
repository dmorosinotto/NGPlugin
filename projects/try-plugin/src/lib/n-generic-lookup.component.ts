import {
    AfterViewInit,
    OnDestroy,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
declare var $: any;
@Component({
    selector: "n-generic-lookup",
    standalone: true,
    imports: [CommonModule],
    template: `
        <fieldset>
            <input type="text" #txt /><button type="button" #btn>...</button>
            <input type="hidden" #hid [value]="value" />
            <legend>Model: {{ model | json }} <-> Value: {{ value }}</legend>
        </fieldset>
    `,
    styles: ["fieldset { display: flex; }", "legend { font-size: 0.75em; float: right; margin: 0 }"],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NGenericLookupComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NGenericLookupComponent<M = any | null, I = string | null, T = string>
    implements AfterViewInit, OnDestroy, ControlValueAccessor
{
    constructor() {
        console.log(this.constructor.name, "on ctor", this.txt?.nativeElement ?? "NOT READY!"); //NOT READY
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
    private _disabled = false;
    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        console.info(this.constructor.name, "setDisabledState", isDisabled);
        $(this.txt.nativeElement).prop("disabled", this._disabled);
        $(this.btn.nativeElement).prop("disabled", this._disabled);
        $(this.hid.nativeElement).prop("disabled", this._disabled);
    }

    @ViewChild("txt", { read: ElementRef, static: true }) txt!: ElementRef;
    @ViewChild("btn", { read: ElementRef, static: true }) btn!: ElementRef;
    @ViewChild("hid", { read: ElementRef, static: true }) hid!: ElementRef;
    private init: any;

    ngAfterViewInit(): void {
        console.log(this.constructor.name, "on ngAfterViewInit", this.txt?.nativeElement ?? "NOT READY!"); //OK
        console.info(this.constructor.name, "on ngAfterViewInit CURRENT", this.type, this.idField);
        if (!this.type || !this.idField) {
            console.error("CAN'T INIT genericLookup PLUGIN MISSING", this.type, this.idField);
        } else {
            //$(function () {
            this.init = $(this.txt.nativeElement).genericLookup({
                type: this.type,
                button: $(this.btn.nativeElement),
                hiddenControl: $(this.hid.nativeElement),
                remote: false, //this.remote,
                idField: (model: M) => {
                    const val: I = this._hidFn(model);
                    console.warn(this.constructor.name, "idField nativeElement", model, "->", val);
                    this._update(model, "");
                },
                autocomplete: true,
                autocompleteOnLoad: true,
                pageSize: 5, //this.pageSize,
                selectedElement: (model: M) => {
                    const text: T = this._txtFn(model);
                    console.warn(
                        this.constructor.name,
                        "selectedElement nativeElement after idField ->",
                        model,
                        "FORMAT=",
                        text,
                        " <=> $",
                        $(this.txt.nativeElement).val()
                    );
                    if (model == null) this._update(model, ""); //GESTIONE DEL CASO DI null NON PASSA PER idField
                    //VOLENDO POTREI FARE QUI AGGIORNAMETNI INPUT nativeElement AL POSTO DEL _update
                    this.hid.nativeElement.value = this.value; // $(this.hid.nativeElement).val(value);
                    this.txt.nativeElement.value = text; // $(this.txt.nativeElement).val(text);
                    //EMIT Change + OnTouch
                    console.info(
                        this.constructor.name,
                        "EMIT Change + OnTouch ID=",
                        this.value,
                        " <-> $",
                        $(this.hid.nativeElement).val(),
                        " =?= ",
                        this.hid.nativeElement.value,
                        "TEXT=",
                        text,
                        " <-> $",
                        $(this.txt.nativeElement).val(),
                        " =?= ",
                        this.txt.nativeElement.value
                    );
                },
            });
            //});
        }
    }

    ngOnDestroy(): void {
        if (this.init)
            try {
                console.log("destroy LOOKUP ", obj);
                // this.init.closeLookupManually({ data: null });
                var obj = this.init; //COPIATO DA closeLookupManually
                obj.igGrid && $(obj.igGrid).igGrid("destroy");
                obj.modal && obj.modal.detach();
                obj.options.idField = null;
                obj.options.selectedElement = function () {};
                obj.options.getCustomColumns = function () {};
                obj.options.getRuntimeParameters = function () {};
            } catch (err) {
                console.error(this.constructor.name, "ERROR ngOnDestroy", err);
            }
    }

    @Input() type!: string; // = "Aircraft";
    @Input() idField!: string; // = "Aircraft_Sub_Iata";
    // @Input() pageSize?: number = 5;
    // @Input() remote?: boolean = false;

    @Input() set model(model: M) {
        if (model === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._model !== model) {
            console.info(this.constructor.name, "SET MODEL", model);
            this._update(model, "model");
        } else {
            console.info(this.constructor.name, model, "MODEL IS SAME");
        }
    }
    get model(): M {
        return this._model!;
    }
    private _model?: M;
    @Output() modelChange = new EventEmitter<M>();

    @Input() set value(value: I) {
        if (value === undefined) {
            console.info(this.constructor.name, "IGNORE VALUE NOT SET === undefined");
            return;
        }
        if (this._value !== value) {
            if (this.init && this.hid) {
                console.info(this.constructor.name, "SET VALUE", value);
                $(this.hid.nativeElement).val(value);
                this.init.autoComplete({ data: this.init, value }); //autoComplete IMPLICIT CALL IdField(model) ==> _update
            } else {
                console.warn(this.constructor.name, "SET VALUE", value, "DELAY WAITING init..."); //TEORICAMENTE DOVREBBE PARTIRE CON autocompleteOnLoad=true
                this._value = value;
                //setTimeout(() => this.value = value);
            }
        } else {
            console.info(this.constructor.name, value, "VALUE IS SAME");
        }
    }
    get value(): I {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<I>();
    private _value?: I;

    private _txtFn = (model: M): T => {
        if (model == null) return "" as any as T;
        else {
            const m: any = model;
            return `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}` as any as T;
        }
    };
    private _hidFn = (model: M): I => {
        const m: any = model;
        if (m == null) return m as I; //null
        return m[this.idField] as I;
    };

    @Input() immutable?: boolean;
    @Output() change = new EventEmitter<{ text: T; value: I; model: M; old: M }>();
    private _issame = (old: any, cur: any) => (this.immutable && old === cur) || JSON.stringify(old) == JSON.stringify(cur);

    private _update(model: M, noemit: "" | "model" | "value" = "") {
        if (model === undefined) return; //EVITO INIZIALIZZAZIONE SE VALORE NON SPECIFICATO
        const old = this.model;
        const changed = !this._issame(old, model);
        const value: I = this._hidFn(model);
        const text: T = this._txtFn(model);
        this._model = model;
        this._value = value;
        // this.hid.nativeElement.value = value; // $(this.hid.nativeElement).val(value);
        // this.txt.nativeElement.value = text; // $(this.txt.nativeElement).val(text);
        if (noemit != "model") {
            console.info(this.constructor.name, "EMIT model CHANGE");
            this.modelChange.emit(model);
        }
        if (noemit != "value") {
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
        if (changed) this.change.emit({ text, value, model, old });
        console.warn(
            this.constructor.name,
            "FINE _update",
            this.value,
            "<->",
            $(this.hid.nativeElement).val(),
            text,
            "<==>",
            $(this.txt.nativeElement).val()
        );
    }
}
